import { Prop } from "@nestjs/mongoose";
import { IsDate, IsDateString, IsOptional, IsString } from "class-validator";

export class UpdateUserDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    age?: string;

    @IsString()
    @IsOptional()
    role?: string;

    @IsString()
    @IsDateString({}, { message: "dob must be in ISO date format (e.g., YYYY-MM-DD)" })
    @IsOptional()
    dob?: string;

}