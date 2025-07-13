import { HttpException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private userService: UsersService, private jwtService: JwtService) { }

    async login(userEmail: string, password: string) {
        // Logic for user authentication
        const user = await this.userService.getUserByEmail(userEmail);
        const isPassWordValid = bcrypt.compareSync(password, user.password); // Compare the hashed password
        if (!user || !isPassWordValid) {
            throw new HttpException('Invalid credentials', 400);
        }

        const payload = { email: user.email, sub: user._id, role: user.role };
        const token = await this.jwtService.signAsync(payload, {
            secret: process.env.JWT_SECRET,
            expiresIn: process.env.JWT_EXPIRATION,
        });

        // Only return selected user fields
        const sanitizedUser = {
            id: user._id,
            name: user.name,
            email: user.email,
        };

        return { user : sanitizedUser, token };
    }
}
