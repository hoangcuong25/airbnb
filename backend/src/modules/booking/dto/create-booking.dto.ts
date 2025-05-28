import { IsInt, IsDateString, IsNumber, IsEnum } from 'class-validator';
import { BookingStatus } from '@prisma/client'; // nếu bạn dùng enum từ Prisma

export class CreateBookingDto {
    @IsInt()
    listingId: number;

    @IsDateString()
    checkInDate: string;

    @IsDateString()
    checkOutDate: string;

    @IsNumber()
    totalPrice: number;

    @IsEnum(BookingStatus)
    status?: BookingStatus;

    @IsInt()
    guestNumber: number;
}
