import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateReportDto } from './dto/create-report.dto'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class ReportService {
  constructor(private prisma: PrismaService) { }

  async create(reporterId: number, dto: CreateReportDto) {
    const listing = await this.prisma.listing.findUnique({
      where: { id: dto.listingId },
    })
    if (!listing) {
      throw new NotFoundException('Listing không tồn tại')
    }

    const report = await this.prisma.report.create({
      data: {
        reporterId,
        listingId: dto.listingId,
        reason: dto.reason,
        status: dto.status,
      },
    })

    return report
  }

  async findAll() {
    return this.prisma.report.findMany({
      include: {
        reporter: true,
        listing: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
  }
}
