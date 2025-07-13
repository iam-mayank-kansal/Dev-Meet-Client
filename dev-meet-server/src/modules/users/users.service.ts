import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    async createUser(createUserDto: CreateUserDto) {
        const newUser = new this.userModel(createUserDto);
        return await newUser.save();
    }

    async getAllUsers() {
        return await this.userModel.find();
    }

    async getUserById(id: string) {
        const findUser = await this.userModel.findById(id);
        if (!findUser) {
            throw new HttpException('User not found', 404);
        }
        return findUser;
    }

    async updateUser(id: string, updateUserDto: UpdateUserDto) {
        const UpdatedUser = await this.userModel.findByIdAndUpdate(id, updateUserDto);;
        if (!UpdatedUser) {
            throw new HttpException('User not found', 404);
        }
        return UpdatedUser;
    }
}
