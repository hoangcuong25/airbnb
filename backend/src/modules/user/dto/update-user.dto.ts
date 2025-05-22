import { IsOptional, IsString, IsInt, IsEnum, IsUrl, IsDate, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
    OTHER = 'OTHER'
}

export class UpdateUserDto {
    @IsNotEmpty()
    @Type(() => Number)
    @IsInt()
    id: number;

    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsUrl()
    avatar?: string;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    age?: number;

    @IsOptional()
    @IsEnum(Gender, { message: 'Gender must be MALE, FEMALE, or OTHER' })
    gender?: Gender;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    dob?: Date;

    @IsOptional()
    @IsString()
    address?: string;

    @IsOptional()
    @IsString()
    phone?: string;
}
