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

      if (await this.isEmailExist(email)) throw new BadRequestException('Email đã được sử dụng.');
      if (password1 !== password2) throw new BadRequestException('Mật khẩu không khớp.');

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
      throw new BadRequestException('Lỗi máy chủ nội bộ.');
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

    if (await this.isEmailExist(email)) throw new BadRequestException('Email đã được sử dụng!');
    if (password1 !== password2) throw new BadRequestException('Mật khẩu không khớp.');

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

  async getProfile(req: { id: number }) {
    return await this.findById(req.id);
  }

  async updateProfile(req: { id: number }, updateUserDto: any, image?: Express.Multer.File) {
    const user = await this.findById(req.id);
    if (!user) throw new BadRequestException('Không tìm thấy người dùng.');

    const updateData = { ...updateUserDto };

    if (image) {
      const imageUpload = await this.cloudinaryService.uploadFile(image);
      updateData.avatar = imageUpload.url;
    }

    await this.prisma.user.update({
      where: { id: req.id },
      data: updateData,
    });

    return 'Cập nhật thành công.';
  }

  async updatePhone(req: { id: number }, phone: string) {
    await this.prisma.user.update({
      where: { id: req.id },
      data: { phone },
    });

    return 'Cập nhật thành công.';
  }

  async updatePassword(req: { id: number }, reqBody: any) {
    const { newPassword1, newPassword2, oldPassword } = reqBody;
    const user = await this.findById(req.id);
    if (!user) throw new BadRequestException('Không tìm thấy người dùng.');

    const isOldPasswordValid = await comparePasswordHelper(oldPassword, user.password);
    if (!isOldPasswordValid) throw new BadRequestException('Mật khẩu cũ không đúng.');
    if (newPassword1 !== newPassword2) throw new BadRequestException('Mật khẩu mới không khớp.');

    const hashedPassword = await hashPasswordHelper(newPassword1);

    await this.prisma.user.update({
      where: { id: req.id },
      data: { password: hashedPassword },
    });

    return 'Đổi mật khẩu thành công.';
  }

  async deleteUser(userId: number) {
    await this.prisma.user.delete({ where: { id: userId } });
    return 'Xóa người dùng thành công.';
  }

  async updateUser(updateUserDto: UpdateUserDto, avatar?: Express.Multer.File) {
    const { id, ...updateData } = updateUserDto;

    if (avatar) {
      const existingUser = await this.prisma.user.findUnique({
        where: { id },
      });

      if (existingUser?.avatar) {
        const publicId = this.cloudinaryService.extractPublicId(existingUser.avatar);
        if (publicId) {
          await this.cloudinaryService.deleteFile(publicId);
        }
      }

      const imageUpload = await this.cloudinaryService.uploadFile(avatar);
      updateData.avatar = imageUpload.url;
    }

    await this.prisma.user.update({
      where: { id },
      data: updateData,
    });

    return 'Cập nhật người dùng thành công.';
  }

  async becomeHost(userId: number) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new BadRequestException('Không tìm thấy người dùng.');

    if (user.role === UserRole.HOST) {
      throw new BadRequestException('Bạn đã là chủ nhà.');
    }

    await this.prisma.user.update({
      where: { id: userId },
      data: { role: UserRole.HOST },
    });

    return 'Bạn đã trở thành chủ nhà.';
  }
}
