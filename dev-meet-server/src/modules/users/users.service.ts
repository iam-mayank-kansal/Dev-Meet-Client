import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    async createUser(createUserDto: CreateUserDto) {
        const email = createUserDto.email
        const isEmailExist = await this.userModel.findOne({ email });
        if(isEmailExist)
        {
           throw new HttpException('User with same Email Exists', 409);
        }
        const newUser = new this.userModel(createUserDto);

        // Hash the password before saving
        const saltRounds = parseInt(process.env.saltRounds) || 10;
        newUser.password = await bcrypt.hash(newUser.password, saltRounds);
        // Save the user to the database
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

    async getUserByEmail(email: string) {
        const findUser = await this.userModel.findOne({ email });
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
