import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty({ message: 'First name cannot be empty' })
    firstName: string;

    @IsNotEmpty({ message: 'Last name cannot be empty' })
    lastName: string;

    @IsNotEmpty({ message: 'Email cannot be empty' })
    @IsEmail({}, { message: 'Invalid email' })
    email: string;

    @IsNotEmpty({ message: 'Password cannot be empty' })
    password1: string;

    @IsNotEmpty({ message: 'Password cannot be empty' })
    password2: string;

    @IsNotEmpty({ message: 'Date of birth cannot be empty' })
    dob: string

    @IsNotEmpty({ message: 'Phone number cannot be empty' })
    phone: string;
}