import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) { }

  async create(dto: CreateReviewDto, guestId) {
    // Kiểm tra xem đã đánh giá chưa
    const existing = await this.prisma.review.findUnique({
      where: {
        guestId_listingId: {
          guestId: guestId,
          listingId: dto.listingId,
        },
      },
    });

    if (existing) {
      throw new BadRequestException('Bạn đã đánh giá chỗ nghỉ này rồi.');
    }

    // Kiểm tra nếu đã từng đặt phòng và đã hoàn tất
    const booking = await this.prisma.booking.findFirst({
      where: {
        guestId: guestId,
        listingId: dto.listingId,
        status: {
          in: ['COMPLETED'], // chỉ cho phép nếu đã ở xong
        },
        checkOutDate: {
          lte: new Date(), // thời gian trả phòng đã qua
        },
      },
    });

    if (!booking) {
      throw new BadRequestException('Bạn chỉ có thể đánh giá sau khi đã ở tại chỗ nghỉ này.');
    }

    // Tạo đánh giá
    return this.prisma.review.create({
      data: {
        rating: dto.rating,
        comment: dto.comment,
        guestId: guestId,
        listingId: dto.listingId,
      },
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
    if (!review) throw new NotFoundException('Không tìm thấy đánh giá.');

    return this.prisma.review.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    const review = await this.prisma.review.findUnique({ where: { id } });
    if (!review) throw new NotFoundException('Không tìm thấy đánh giá.');

    return this.prisma.review.delete({ where: { id } });
  }
}
