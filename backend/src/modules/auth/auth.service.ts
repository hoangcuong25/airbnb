import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
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
    await this.redis.set(`refresh_token:${userId}`, refresh_token, 'EX', 7 * 24 * 60 * 60); // 7 ngày
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

    if (password1 !== password2) throw new BadRequestException('Mật khẩu không trùng khớp');

    const existUser = await this.prisma.user.findUnique({ where: { email } });
    if (existUser) throw new BadRequestException('Email đã tồn tại!');

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

      res.clearCookie('refresh_token', {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/',
      });

      return 'ok';
    } catch {
      throw new UnauthorizedException('Không có quyền xác thực');
    }
  }

  async refreshToken(req) {
    const refreshToken = req.cookies.refresh_token;

    if (!refreshToken) throw new UnauthorizedException('Không tìm thấy refresh token');

    const decoded = this.jwtService.verify(refreshToken, {
      secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
    });
    const storedToken = await this.redis.get(`refresh_token:${decoded.id}`);

    if (storedToken !== refreshToken) throw new UnauthorizedException('Refresh token không hợp lệ');

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
      subject: 'Kích hoạt tài khoản',
      text: 'Chào mừng bạn',
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
      throw new BadRequestException('Mã kích hoạt không chính xác');
    }

    if (user.verificationOtpExpires && new Date() > user.verificationOtpExpires) {
      throw new BadRequestException('Mã kích hoạt đã hết hạn');
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
    if (!email) throw new BadRequestException('Vui lòng nhập email');

    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new BadRequestException('Người dùng không tồn tại');

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
      subject: 'Khôi phục mật khẩu',
      text: 'Đặt lại mật khẩu của bạn',
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
      throw new BadRequestException('Email, mã OTP và mật khẩu mới là bắt buộc');
    }

    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new BadRequestException('Người dùng không tồn tại');

    if (!user.resetOtp || user.resetOtp !== otp) {
      throw new BadRequestException('Mã OTP không chính xác');
    }

    if (user.resetOtpExpires && new Date() > user.resetOtpExpires) {
      throw new BadRequestException('Mã OTP đã hết hạn');
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
      throw new BadRequestException('Vui lòng nhập đầy đủ thông tin');
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
          phone: 'Không rõ',
          password: hashedPassword,
          dob: 'Không rõ',
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
