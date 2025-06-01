import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) { }

  async create(dto: CreateReviewDto, guestId) {
    // Check nếu đã review rồi
    const existing = await this.prisma.review.findUnique({
      where: {
        guestId_listingId: {
          guestId: guestId,
          listingId: dto.listingId,
        },
      },
    });

    if (existing) {
      throw new BadRequestException('You have already reviewed this listing.');
    }

    // Check nếu đã từng đặt phòng và booking đã hoàn thành hoặc xác nhận
    const booking = await this.prisma.booking.findFirst({
      where: {
        guestId: guestId,
        listingId: dto.listingId,
        status: {
          in: ['COMPLETED'], //  chỉ cho phép nếu đã thuê phòng
        },
        checkOutDate: {
          lte: new Date(), //  checkOut đã qua (người dùng đã ở xong)
        },
      },
    });

    if (!booking) {
      throw new BadRequestException('You can only review a listing after staying there.');
    }

    // Tạo review
    return this.prisma.review.create({
      data: dto,
    });
  }

  findAll() {
    return this.prisma.review.findMany({
      include: {
        guest: true,
        listing: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.review.findUnique({
      where: { id },
      include: {
        guest: true,
        listing: true,
      },
    });
  }

  async update(id: number, dto: UpdateReviewDto) {
    const review = await this.prisma.review.findUnique({ where: { id } });
    if (!review) throw new NotFoundException('Review not found');

    return this.prisma.review.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    const review = await this.prisma.review.findUnique({ where: { id } });
    if (!review) throw new NotFoundException('Review not found');

    return this.prisma.review.delete({ where: { id } });
  }
}
