import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { ReportService } from './report.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { ResponseMessage } from 'src/decorator/customize';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) { }

  @Post()
  @ResponseMessage('create')
  create(@Req() req, @Body() dto: CreateReportDto) {
    const reporterId = req.user.id
    return this.reportService.create(reporterId, dto)
  }

  @Get()
  @ResponseMessage('find all')
  findAll() {
    return this.reportService.findAll()
  }
}
