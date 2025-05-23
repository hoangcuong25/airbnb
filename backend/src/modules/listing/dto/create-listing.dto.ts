import { Type } from 'class-transformer';
import { IsString, IsInt } from 'class-validator';

export class CreateListingDto {
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsInt()
    @Type(() => Number)
    pricePerNight: number;
    @IsString()
    address: string;

    @IsString()
    city: string;

    @IsString()
    country: string;

    @IsInt()
    @Type(() => Number)
    hostId: number;
}
