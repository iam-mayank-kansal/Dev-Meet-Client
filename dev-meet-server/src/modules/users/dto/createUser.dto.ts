import { IsEmail,  IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

// for this we need to import the class-validator package
export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;
    
    @IsEmail()
    @IsNotEmpty()
    email: string;
    
    @IsStrongPassword()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    role: string;
}