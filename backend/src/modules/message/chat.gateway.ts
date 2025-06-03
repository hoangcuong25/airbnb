import {
    WebSocketGateway,
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@WebSocketGateway({ cors: { origin: '*' } })
@Injectable()
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private server: Server;
    private userRooms: Map<string, number> = new Map(); // clientId -> userId

    constructor(private readonly prisma: PrismaService) { }

    afterInit(server: Server) {
        this.server = server;
    }

    handleConnection(client: Socket) {
        client.on('join_room', async (userId: number) => {
            client.join(String(userId)); // Dùng userId làm roomId riêng
            this.userRooms.set(client.id, userId);

            const messages = await this.prisma.message.findMany({
                where: {
                    OR: [
                        { senderId: userId },
                        { receiverId: userId },
                    ],
                },
                orderBy: { createdAt: 'asc' },
                include: {
                    sender: { select: { id: true, name: true, role: true } },
                    receiver: { select: { id: true, name: true, role: true } },
                },
            });

            client.emit('loadMessages', messages);
        });

        client.on('sendMessage', async ({ senderId, receiverId, content }) => {
            const roomSender = this.userRooms.get(client.id);
            if (!roomSender || roomSender !== senderId) return;

            const newMessage = await this.prisma.message.create({
                data: {
                    senderId,
                    receiverId,
                    content,
                },
                include: {
                    sender: { select: { id: true, name: true, role: true } },
                    receiver: { select: { id: true, name: true, role: true } },
                },
            });

            // Gửi cho cả người gửi và người nhận (room là userId)
            this.server.to(String(senderId)).emit('receiveMessage', newMessage);
            this.server.to(String(receiverId)).emit('receiveMessage', newMessage);

            // Broadcast thông báo nếu cần
            client.broadcast.emit('newNotification', {
                userName: newMessage.sender.name,
                message: newMessage.content,
            });
        });
    }

    handleDisconnect(client: Socket) {
        this.userRooms.delete(client.id);
    }
}
