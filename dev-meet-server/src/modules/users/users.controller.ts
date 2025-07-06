import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';

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
        return this.userService.getUserById(id);
    }

}
