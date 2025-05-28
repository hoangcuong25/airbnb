import { Injectable, Logger } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class BookingService {

  private readonly logger = new Logger(BookingService.name)

  constructor(private readonly prisma: PrismaService) { }

  async create(createBookingDto: CreateBookingDto, guestId: number) {
    return this.prisma.booking.create({
      data: {
        ...createBookingDto,
        guestId: guestId,
        checkInDate: new Date(createBookingDto.checkInDate),
        checkOutDate: new Date(createBookingDto.checkOutDate),
      },
    });
  }

  // CRON: tự động huỷ các booking "pending" sau 24h
  @Cron(CronExpression.EVERY_HOUR) // chạy mỗi giờ
  async cancelExpiredBookings() {
    const now = new Date();
    const expiredTime = new Date(now.getTime() - 24 * 60 * 60 * 1000); // 24 giờ trước

    const result = await this.prisma.booking.updateMany({
      where: {
        status: 'PENDING',
        createdAt: {
          lt: expiredTime,
        },
      },
      data: {
        status: 'CANCELLED',
      },
    });

    if (result.count > 0) {
      this.logger.log(`Đã huỷ ${result.count} booking quá hạn.`);
    }
  }

  findAll() {
    return `This action returns all booking`;
  }

  findOne(id: number) {
    return `This action returns a #${id} booking`;
  }

  update(id: number, updateBookingDto: UpdateBookingDto) {
    return `This action updates a #${id} booking`;
  }

  remove(id: number) {
    return `This action removes a #${id} booking`;
  }
}
