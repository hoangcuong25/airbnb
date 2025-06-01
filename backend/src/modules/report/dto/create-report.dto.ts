import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { ReportStatus } from '@prisma/client'

export class CreateReportDto {
    @IsNumber()
    listingId: number

    @IsString()
    @IsNotEmpty()
    reason: string

    @IsEnum(ReportStatus)
    status: ReportStatus = ReportStatus.PENDING
}