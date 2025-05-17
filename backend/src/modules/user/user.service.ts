import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateAuthDto } from '../auth/dto/create-auth.dto';
import { comparePasswordHelper, hashPasswordHelper } from 'src/helpers/util';
import { v4 as uuidv4 } from 'uuid';
import { MailerService } from '@nestjs-modules/mailer';
import dayjs from 'dayjs';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class UserService {

  constructor(
    // @InjectModel('User') private userModel: Model<User>,
    private readonly mailerService: MailerService,
    private readonly cloudinaryService: CloudinaryService
  ) { }

  isEmailExist = async (email: string) => {
    const user = await this.userModel.exists({ email })

    if (user) return true
    return false
  }

  async updateCodeActive(_id, codeId) {
    await this.userModel.findByIdAndUpdate(_id,
      {
        codeId: codeId,
        codeExpired: new Date(Date.now() + 5 * 60 * 1000)
      })
  }

  async activeAccount(_id) {
    await this.userModel.findByIdAndUpdate(_id, {
      isActive: true,
      codeId: '',
      codeExpired: 0
    })
  }

  async updateOptReset(_id, otp) {
    await this.userModel.findByIdAndUpdate(_id,
      {
        resetOpt: otp,
        resetOptExpireAt: new Date(Date.now() + 5 * 60 * 1000)
      }
    )
  }

  async resetPassword(_id, password) {
    await this.userModel.findByIdAndUpdate(_id, {
      password: password,
      resetOpt: '',
      resetOptExpireAt: 0
    })
  }

  async createWithGoole(userData) {
    const newUser = new this.userModel(userData)
    await newUser.save()

    return newUser
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const { firstName, lastName, email, password1, password2, dob, phone } = createUserDto

      const isExist = await this.isEmailExist(email)
      if (isExist) {
        throw new BadRequestException('Email already exists')
      }

      if (password1 !== password2) {
        throw new BadRequestException('Password not match')
      }

      const isPhone = await this.userModel.findOne({ phone })
      if (isPhone) {
        throw new BadRequestException('Phone already exists')
      }

      if (phone.length !== 10) {
        throw new BadRequestException('Phone number must be 10 digits')
      }

      const hashPassword = await hashPasswordHelper(password1)

      const user = await this.userModel.create({
        firstName,
        lastName,
        email,
        password: hashPassword,
        dob,
        phone,
        isActive: false,
        codeExpired: dayjs().add(5, 'minute')
      })

      return {
        _id: user._id,
      }
    } catch (error) {
      console.log(error)
      throw new BadRequestException('internal server error')
    }
  }

  async findByEmail(email: string) {
    return await this.userModel.findOne({ email })
  }

  async findById(_id: string) {
    return await this.userModel.findById(_id)
  }

  async handleRegister(registerDto: CreateAuthDto) {
    const { firstName, lastName, email, password1, password2, dob, phone } = registerDto

    const isExist = await this.isEmailExist(email)
    if (isExist) {
      throw new BadRequestException('Email already exists!')
    }

    if (password1 !== password2) {
      throw new BadRequestException('Password not match')
    }

    const isPhone = await this.userModel.findOne({ phone })
    if (isPhone) {
      throw new BadRequestException('Phone already exists')
    }

    if (phone.length !== 10) {
      throw new BadRequestException('Phone number must be 10 digits')
    }

    const hashPassword = await hashPasswordHelper(password1)

    const user = await this.userModel.create({
      firstName,
      lastName,
      email,
      password: hashPassword,
      dob,
      phone,
      isActive: false,
    })

    return {
      _id: user._id,
    }
  }

  async findAll() {
    return await this.userModel.find()
  }

  async getProfile(req) {
    return await this.userModel.findById(req._id)
  }

  async updateProfile(req, updateUserDto, image) {
    const { firstName, lastName, dob, gender, address } = updateUserDto
    const user = await this.userModel.findById(req._id)

    if (!user) {
      throw new BadRequestException('User not found')
    }

    await this.userModel.findByIdAndUpdate(req._id, { firstName, lastName, dob, gender, address })

    if (image) {
      // upload image to cloudinary
      const imageUpload = await this.cloudinaryService.uploadFile(image)
      const imageUrl = imageUpload.url

      await this.userModel.findByIdAndUpdate(req._id, { image: imageUrl })
    }

    return 'ok'
  }

  async updatePhone(req, phone) {
    await this.userModel.findByIdAndUpdate(req._id, { phone: phone })
    return 'ok'
  }

  async updatePassword(req, reqBody) {
    const { newPassword1, newPassword2, oldPassword } = reqBody

    const user = await this.userModel.findById(req._id)

    if (!user) {
      throw new BadRequestException('User not found')
    }

    const isOldPasswordValid = await comparePasswordHelper(oldPassword, user.password)

    if (!isOldPasswordValid) {
      throw new BadRequestException('Incorrect old password')
    }

    if (newPassword1 !== newPassword2) {
      throw new BadRequestException('New passwords do not match')
    }

    const hashedPassword = await hashPasswordHelper(newPassword1)

    await this.userModel.findByIdAndUpdate(req._id, { password: hashedPassword })

    return 'ok'
  }

  async deleteUser(userId) {
    await this.userModel.findByIdAndDelete(userId)

    return 'ok'
  }
}