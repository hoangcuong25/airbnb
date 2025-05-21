import { IsOptional, IsString, IsInt, IsEnum, IsUrl } from 'class-validator';

export enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
    OTHER = 'OTHER'
}

export class UpdateUserDto {

    id: number;

    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    password?: string;

    @IsOptional()
    @IsUrl()
    avatar?: string;

    @IsOptional()
    @IsInt()
    age?: number;

    @IsOptional()
    @IsEnum(Gender, { message: 'Gender must be MALE, FEMALE, or OTHER' })
    gender?: Gender;

    @IsOptional()
    dob?: Date;

    @IsOptional()
    @IsString()
    address?: string;

    @IsOptional()
    phone?: string;
}
