import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateAuthDto } from '../auth/dto/create-auth.dto';
import { comparePasswordHelper, hashPasswordHelper } from 'src/helpers/util';
import { MailerService } from '@nestjs-modules/mailer';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserRole } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailerService: MailerService,
    private readonly cloudinaryService: CloudinaryService,
  ) { }

  async isEmailExist(email: string) {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  async updateCodeActive(id: number, codeId: string) {
    await this.prisma.user.update({
      where: { id },
      data: {
        verificationOtp: codeId,
        verificationOtpExpires: new Date(Date.now() + 5 * 60 * 1000),
      },
    });
  }

  async activeAccount(id: number) {
    await this.prisma.user.update({
      where: { id },
      data: {
        isVerified: true,
        verificationOtp: null,
        verificationOtpExpires: null,
      },
    });
  }

  async updateOptReset(id: number, otp: string) {
    await this.prisma.user.update({
      where: { id },
      data: {
        resetOtp: otp,
        resetOtpExpires: new Date(Date.now() + 5 * 60 * 1000),
      },
    });
  }

  async resetPassword(id: number, password: string) {
    await this.prisma.user.update({
      where: { id },
      data: {
        password,
        resetOtp: null,
        resetOtpExpires: null,
      },
    });
  }

  async createWithGoole(userData: any) {
    return await this.prisma.user.create({ data: userData });
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const { name, email, password1, password2 } = createUserDto;

      if (await this.isEmailExist(email)) throw new BadRequestException('Email already exists');
      if (password1 !== password2) throw new BadRequestException('Password not match');

      const hashPassword = await hashPasswordHelper(password1);

      const user = await this.prisma.user.create({
        data: {
          name,
          email,
          password: hashPassword,
          isVerified: false,
        },
      });

      return { id: user.id };
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Internal server error');
    }
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  async findById(id: number) {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async handleRegister(registerDto: CreateAuthDto) {
    const { name, email, password1, password2 } = registerDto;

    if (await this.isEmailExist(email)) throw new BadRequestException('Email already exists!');
    if (password1 !== password2) throw new BadRequestException('Password not match');

    const hashPassword = await hashPasswordHelper(password1);

    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
        isVerified: false,
      },
    });

    return { id: user.id };
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async getProfile(req: { _id: number }) {
    return await this.findById(req._id);
  }

  async updateProfile(req: { id: number }, updateUserDto: any, image?: Express.Multer.File) {
    const user = await this.findById(req.id);
    if (!user) throw new BadRequestException('User not found');

    const updateData = { ...updateUserDto };

    if (image) {
      const imageUpload = await this.cloudinaryService.uploadFile(image);
      updateData.avatar = imageUpload.url;
    }

    await this.prisma.user.update({
      where: { id: req.id },
      data: updateData,
    });

    return 'ok';
  }

  async updatePhone(req: { _id: number }, phone: string) {
    await this.prisma.user.update({
      where: { id: req._id },
      data: { phone },
    });

    return 'ok';
  }

  async updatePassword(req: { _id: number }, reqBody: any) {
    const { newPassword1, newPassword2, oldPassword } = reqBody;
    const user = await this.findById(req._id);
    if (!user) throw new BadRequestException('User not found');

    const isOldPasswordValid = await comparePasswordHelper(oldPassword, user.password);
    if (!isOldPasswordValid) throw new BadRequestException('Incorrect old password');
    if (newPassword1 !== newPassword2) throw new BadRequestException('New passwords do not match');

    const hashedPassword = await hashPasswordHelper(newPassword1);

    await this.prisma.user.update({
      where: { id: req._id },
      data: { password: hashedPassword },
    });

    return 'ok';
  }

  async deleteUser(userId: number) {
    await this.prisma.user.delete({ where: { id: userId } });
    return 'ok';
  }

  async updateUser(updateUserDto: UpdateUserDto, avatar?: Express.Multer.File) {
    const { id, ...updateData } = updateUserDto;

    if (avatar) {
      const imageUpload = await this.cloudinaryService.uploadFile(avatar);
      updateData.avatar = imageUpload.url;
    }

    await this.prisma.user.update({
      where: { id },
      data: updateData,
    });

    return 'ok';
  }
}
