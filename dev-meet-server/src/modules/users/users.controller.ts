import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import isValidateUserId from 'src/lib/utils/helper';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
    // injecting service class here 
    constructor(private userService: UsersService) { }

    // --- Static routes should come before dynamic routes ---

    @Get('all')
    getAllUsers() {
        return this.userService.getAllUsers();
    }

    // The 'profile' route must be before the ':id' route.
    @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    getProfile(@Req() req: any) {
        // The JwtStrategy has already validated the token and attached the user payload.
        const userId = req.user.sub;
        isValidateUserId(userId); // This checks if the ID from the token is valid
        return this.userService.getUserById(userId);
    }

    @Post('create')
    @UsePipes(new ValidationPipe()) // This will validate the incoming request body against the DTO
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.userService.createUser(createUserDto);
    }

    // --- Dynamic (parameterized) routes should come after static routes ---

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
}
