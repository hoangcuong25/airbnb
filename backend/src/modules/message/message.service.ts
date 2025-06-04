import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessageService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createMessageDto: CreateMessageDto) {
    const { senderId, receiverId, content } = createMessageDto;

    return await this.prisma.message.create({
      data: {
        senderId,
        receiverId,
        content,
      },
    });
  }

  // Gợi ý: không nên dùng nếu hệ thống có nhiều message
  async findAll() {
    return await this.prisma.message.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    return await this.prisma.message.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateMessageDto: Partial<CreateMessageDto>) {
    return await this.prisma.message.update({
      where: { id },
      data: updateMessageDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.message.delete({
      where: { id },
    });
  }

  // ✅ Tìm tất cả tin nhắn giữa hai user
  async findMessagesBetweenUsers(user1: number, user2: number) {
    return await this.prisma.message.findMany({
      where: {
        OR: [
          { senderId: user1, receiverId: user2 },
          { senderId: user2, receiverId: user1 },
        ],
      },
      orderBy: { createdAt: 'asc' },
      include: {
        sender: { select: { id: true, name: true, role: true } },
        receiver: { select: { id: true, name: true, role: true } },
      },
    });
  }
}
