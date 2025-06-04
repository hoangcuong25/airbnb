import { Controller, Get, Post, Body, Param, Query, Req } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { ResponseMessage } from 'src/decorator/customize';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) { }

  @Post()
  @ResponseMessage('texting')
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.messageService.create(createMessageDto);
  }

  @Get('conversation')
  @ResponseMessage('history messages')
  findConversation(
    @Query('user1') user1: string,
    @Query('user2') user2: string,
  ) {
    return this.messageService.findMessagesBetweenUsers(+user1, +user2);
  }

  @Get()
  findOne(@Req() req) {
    return this.messageService.findOne(req.user.id);
  }

  @Get('contacts')
  @ResponseMessage('list user was texting with')
  findContacts(@Req() req) {
    return this.messageService.findContacts(req.user.id);
  }
}
