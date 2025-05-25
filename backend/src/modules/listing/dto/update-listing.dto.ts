import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateListingDto {
    @IsNumber()
    id: number;

    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsNumber()
    pricePerNight: number;

    @IsString()
    address: string;

    @IsString()
    city: string;

    @IsString()
    country: string;

    @IsOptional()
    @IsArray()
    removedImageIds?: number[];
}
