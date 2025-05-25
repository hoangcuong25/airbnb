import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service'; // service Prisma
import { comparePasswordHelper, hashPasswordHelper } from 'src/helpers/util';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import * as ms from 'ms';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private readonly mailerService: MailerService,
    @InjectRedis() private readonly redis: Redis,
  ) { }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) return null;

    const isValidPassword = await comparePasswordHelper(pass, user.password);
    if (!isValidPassword) return null;

    return user;
  }

  createRefreshToken = (payload: any) => {
    const refreshExpire = this.configService.get<string>('JWT_REFRESH_EXPIRE') || '7d';
    const refresh_token = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: ms(refreshExpire as ms.StringValue) / 1000,
    });
    return refresh_token;
  };

  async storeRefreshToken(userId: number, refresh_token: string) {
    await this.redis.set(`refresh_token:${userId}`, refresh_token, 'EX', 7 * 24 * 60 * 60); // 7 days
  }

  async login(user: any, response: Response) {
    const userLogin = await this.prisma.user.findUnique({ where: { id: user.id } });

    const payload = {
      sub: userLogin.email,
      iss: 'from server',
      id: userLogin.id,
      role: userLogin.role,
    };

    const refresh_token = this.createRefreshToken(payload);
    await this.storeRefreshToken(userLogin.id, refresh_token);

    response.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/',
    });

    const { password, ...userWithoutPassword } = userLogin;
    return {
      access_token: this.jwtService.sign(payload),
      user: userWithoutPassword,
    };
  }

  async handleRegister(registerDto: CreateAuthDto) {
    const { name, email, password1, password2 } = registerDto;

    if (password1 !== password2) throw new BadRequestException('Password not match');

    const existUser = await this.prisma.user.findUnique({ where: { email } });
    if (existUser) throw new BadRequestException('Email already exists!');

    const hashPassword = await hashPasswordHelper(password1);

    const newUser = await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
        isVerified: false,
        role: 'USER',
      },
    });

    return { id: newUser.id };
  }

  async logout(req, res) {
    try {
      const access_token = req.headers.authorization?.split(' ')[1];
      if (access_token) {
        const decoded = this.jwtService.verify(access_token, {
          secret: this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
        });

        await this.redis.del(`refresh_token:${decoded.id}`);
      }

      // Xoá refresh_token trong cookie
      res.clearCookie('refresh_token', {
        httpOnly: true,
        secure: true, // dùng nếu bạn chạy trên HTTPS
        sameSite: 'strict',
        path: '/', // hoặc path cụ thể nếu bạn set nó khác
      });

      return 'ok';
    } catch {
      throw new UnauthorizedException();
    }
  }

  async refreshToken(req) {
    const refreshToken = req.cookies.refresh_token;

    if (!refreshToken) throw new UnauthorizedException('No refresh token provided!!!');

    const decoded = this.jwtService.verify(refreshToken, {
      secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
    });
    const storedToken = await this.redis.get(`refresh_token:${decoded.id}`);

    if (storedToken !== refreshToken) throw new UnauthorizedException('Invalid refresh token');

    const user = await this.prisma.user.findUnique({ where: { id: decoded.id } });

    const payload = {
      sub: user.email,
      iss: 'from server',
      id: user.id,
      role: user.role,
    };

    return this.jwtService.sign(payload);
  }

  async sendEmailActive(req) {
    const codeId = Math.random().toString(36).substring(2, 8);
    const user = await this.prisma.user.findUnique({ where: { id: req.id } });

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Email Active Account',
      text: 'welcome',
      template: 'register',
      context: {
        name: user.name,
        activationCode: codeId,
      },
    });

    await this.prisma.user.update({
      where: { id: req.id },
      data: {
        verificationOtp: codeId,
        verificationOtpExpires: new Date(Date.now() + 5 * 60 * 1000),
      },
    });

    return 'ok';
  }

  async confirmActive(req, codeId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: req.id } });

    if (user.verificationOtp !== codeId) {
      throw new BadRequestException('Invalid activation code');
    }

    if (user.verificationOtpExpires && new Date() > user.verificationOtpExpires) {
      throw new BadRequestException('Activation code has expired');
    }

    await this.prisma.user.update({
      where: { id: req.id },
      data: {
        isVerified: true,
        verificationOtp: null,
        verificationOtpExpires: null,
      },
    });

    return 'ok';
  }

  async sendResetOtp(email: string) {
    if (!email) throw new BadRequestException('Email is required');

    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new BadRequestException('User not found');

    const otp = Math.random().toString(36).substring(2, 8);

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        resetOtp: otp,
        resetOtpExpires: new Date(Date.now() + 5 * 60 * 1000),
      },
    });

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Reset Password',
      text: 'Reset Your Password',
      template: 'resetPassword',
      context: {
        name: user.name,
        activationCode: otp,
      },
    });

    return 'ok';
  }

  async resetPassword(email: string, otp: string, newPassword: string) {
    if (!email || !otp || !newPassword) {
      throw new BadRequestException('Email, OTP, and password are required');
    }

    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new BadRequestException('User not found');

    if (!user.resetOtp || user.resetOtp !== otp) {
      throw new BadRequestException('Invalid OTP');
    }

    if (user.resetOtpExpires && new Date() > user.resetOtpExpires) {
      throw new BadRequestException('OTP Expired');
    }

    const hashPassword = await hashPasswordHelper(newPassword);

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashPassword,
        resetOtp: null,
        resetOtpExpires: null,
      },
    });

    return 'ok';
  }

  async loginGoogle(firstName: string, lastName: string, email: string, image: string) {
    if (!firstName || !lastName || !email || !image) {
      throw new BadRequestException('Please Fill In All Information');
    }

    let user = await this.prisma.user.findUnique({ where: { email } });

    if (user) {
      const payload = {
        sub: user.email,
        iss: 'from server',
        id: user.id,
        role: user.role,
      };

      const access_token = this.jwtService.sign(payload);
      const refresh_token = this.createRefreshToken(payload);

      await this.storeRefreshToken(user.id, refresh_token);

      return {
        access_token,
        refresh_token,
      };
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = await hashPasswordHelper(generatedPassword);

      user = await this.prisma.user.create({
        data: {
          name: firstName + ' ' + lastName,
          email,
          phone: 'Unknown',
          password: hashedPassword,
          dob: 'Unknown',
          avatar: image,
          isVerified: true,
        },
      });

      const payload = {
        sub: user.email,
        iss: 'from server',
        id: user.id,
        role: user.role,
      };

      const access_token = this.jwtService.sign(payload);
      const refresh_token = this.createRefreshToken(payload);

      await this.storeRefreshToken(user.id, refresh_token);

      return {
        access_token,
        refresh_token,
      };
    }
  }
}
