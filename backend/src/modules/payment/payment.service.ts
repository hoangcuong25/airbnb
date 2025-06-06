import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PaymentService {
  constructor(private prisma: PrismaService) { }

  async create(createPaymentDto: CreatePaymentDto) {
    // Giả sử createPaymentDto có: bookingId, amount, method

    // Nếu thanh toán online, giả sử method là "online" thì tự set status = "COMPLETED" và paidAt = now
    const isOnline = createPaymentDto.method === 'online';

    return this.prisma.payment.create({
      data: {
        bookingId: createPaymentDto.bookingId,
        amount: createPaymentDto.amount,
        method: createPaymentDto.method,
        status: isOnline ? 'COMPLETED' : 'PENDING',
        paidAt: isOnline ? new Date() : null,
      },
    });
  }

  findAll() {
    return this.prisma.payment.findMany();
  }

  findOne(id: number) {
    return this.prisma.payment.findUnique({ where: { id } });
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return this.prisma.payment.update({
      where: { id },
      data: updatePaymentDto,
    });
  }

  remove(id: number) {
    return this.prisma.payment.delete({ where: { id } });
  }
}
