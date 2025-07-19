import { Body, Controller, Get, HttpException, Param, Patch, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';
import mongoose from 'mongoose';
import { UpdateUserDto } from './dto/updateUser.dto';
import isValidateUserId from 'src/lib/utils/helper';
import { AuthGuard } from '../auth/auth.guard';

@Controller('users')
export class UsersController {
    // injecting service class here 
    constructor(private userService: UsersService) { }

    @Post('create')
    @UsePipes(new ValidationPipe()) // This will validate the incoming request body against the DTO
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.userService.createUser(createUserDto);
    }

    @Get('all')
    getAllUsers() {
        return this.userService.getAllUsers();
    }

    @Get(":id")
    getUserById(@Param('id') id: string) {
        isValidateUserId(id);
        return this.userService.getUserById(id);
    }

    @Patch('update/:id')
    @UsePipes(new ValidationPipe())
    updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        isValidateUserId(id);
        return this.userService.updateUser(id, updateUserDto);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Req() req: any) {
        const userId = req.user.sub;
        isValidateUserId(userId);
        return this.userService.getUserById(userId);
    }





}
