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
        // Người dùng tham gia phòng chat giữa họ và người khác
        client.on('join_room', async ({ userId1, userId2 }) => {
            const room = this.getRoomName(userId1, userId2);
            client.join(room);

            // Lưu userId vào Map để kiểm tra quyền gửi tin nhắn
            this.userRooms.set(client.id, userId1);

            const messages = await this.prisma.message.findMany({
                where: {
                    OR: [
                        { senderId: userId1, receiverId: userId2 },
                        { senderId: userId2, receiverId: userId1 },
                    ],
                },
                orderBy: { createdAt: 'asc' },
                include: {
                    sender: { select: { id: true, name: true, role: true, avatar: true } },
                    receiver: { select: { id: true, name: true, role: true, avatar: true } },
                },
            });

            client.emit('loadMessages', messages);
        });

        // Người dùng gửi tin nhắn
        client.on('sendMessage', async ({ senderId, receiverId, content }) => {
            const roomSender = this.userRooms.get(client.id);
            if (!roomSender || roomSender !== senderId) return; // bảo vệ server

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

            const room = this.getRoomName(senderId, receiverId);
            this.server.to(room).emit('receiveMessage', newMessage);

            client.broadcast.emit('newNotification', {
                userName: newMessage.sender.name,
                message: newMessage.content,
            });
        });

        // client.on('load_conversation', async ({ userId1, userId2 }) => {
        //     const messages = await this.prisma.message.findMany({
        //         where: {
        //             OR: [
        //                 { senderId: userId1, receiverId: userId2 },
        //                 { senderId: userId2, receiverId: userId1 },
        //             ],
        //         },
        //         orderBy: { createdAt: 'asc' },
        //         include: {
        //             sender: true,
        //             receiver: true,
        //         },
        //     })
        //     client.emit('loadMessages', messages)
        // })
    }

    handleDisconnect(client: Socket) {
        this.userRooms.delete(client.id);
    }

    // Tạo room name theo cặp người dùng
    private getRoomName(userId1: number, userId2: number): string {
        return [userId1, userId2].sort((a, b) => a - b).join('-'); // VD: "3-9"
    }
}
