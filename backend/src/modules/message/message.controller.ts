import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) { }

  @Post()
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.messageService.create(createMessageDto);
  }

  @Get('conversation')
  findConversation(
    @Query('user1') user1: string,
    @Query('user2') user2: string,
  ) {
    return this.messageService.findMessagesBetweenUsers(+user1, +user2);
  }

  // Nếu vẫn cần lấy theo ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messageService.findOne(+id);
  }
}
