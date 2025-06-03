import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseInterceptors, UploadedFile, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public, ResponseMessage, Roles } from 'src/decorator/customize';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly cloudinaryService: CloudinaryService
  ) { }

  @Post('create')
  @ResponseMessage('create user')
  @Roles('ADMIN')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('get-all-user')
  @ResponseMessage('get all user')
  @Roles('ADMIN')
  findAll() {
    return this.userService.findAll();
  }

  @Get('get-profile')
  @ResponseMessage('get user profile')
  getProfile(@Req() req) {
    return this.userService.getProfile(req.user)
  }

  @Patch('update-profile')
  @ResponseMessage('Cập nhật hồ sơ')
  @UseInterceptors(FileInterceptor('image'))
  updateProfile(
    @Req() req,
    @Body(new ValidationPipe({ transform: true })) updateUserDto: UpdateUserDto,
    @UploadedFile() image: Express.Multer.File
  ) {
    return this.userService.updateProfile(req.user, updateUserDto, image)
  }


  @Patch('update-password')
  updatePassword(
    @Req() req,
    @Body() reqBody: {
      newPassword1: string,
      newPassword2: string,
      oldPassword: string
    }
  ) {
    return this.userService.updatePassword(req.user, reqBody)
  }

  @Delete('delete-user/:id')
  @Roles('ADMIN')
  deleteUser(@Param('id') userId: string) {
    return this.userService.deleteUser(+userId)
  }

  @Patch('update-user')
  @ResponseMessage('update user')
  @Roles('ADMIN')
  @UseInterceptors(FileInterceptor('avatar'))
  updateUser(
    @Body(new ValidationPipe({ transform: true })) updateUserDto: UpdateUserDto,
    @UploadedFile() avatar: Express.Multer.File
  ) {
    return this.userService.updateUser(updateUserDto, avatar)
  }

  @Post('become-host')
  @ResponseMessage('become host')
  becomeHost(
    @Req() req,
  ) {
    return this.userService.becomeHost(req.user.id);
  }
}