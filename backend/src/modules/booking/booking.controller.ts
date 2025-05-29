import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Public, ResponseMessage, Roles } from 'src/decorator/customize';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) { }

  @Post('create')
  @ResponseMessage('create booking')
  create(
    @Body() createBookingDto: CreateBookingDto,
    @Req() req: any
  ) {
    return this.bookingService.create(createBookingDto, req.user.id);
  }

  @Patch('update-status')
  @Roles("HOST")
  @ResponseMessage('update status')
  updateStatus(
    @Body() update,
    @Req() req
  ) {
    return this.bookingService.updateStatus(update, req.user.id)
  }

  @Get('host-booking')
  @Roles("HOST")
  @ResponseMessage("Get all bookings of the host")
  hostBooking(@Req() req) {
    return this.bookingService.hostBooking(req.user.id);
  }

}
