import { Type } from 'class-transformer';
import { IsArray, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateListingDto {

    @IsNumber()
    @Type(() => Number)
    id: number;

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

    @IsOptional()
    @Type(() => Number)
    removedImageIds?: number[];
}
