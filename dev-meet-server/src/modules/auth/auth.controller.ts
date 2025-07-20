import { Controller, Post, Req, HttpException, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    async login(@Req() req: Request, @Res() res: Response) {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new HttpException('Email and password are required', 400);
        }
        try {
            const { user, token } = await this.authService.login(email, password);
            // set cookies 
            res.cookie('auth-cookie', token, {
                httpOnly: true,
                secure: true,
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
                sameSite: 'none',
            });
            return res.status(200).json({ message: 'Login successful', user, token });
        }
        catch (error) {
            throw new HttpException(error.message, 401);
        }
    }

    @Post('logout')
    logout(@Res() res: Response) {
        res.clearCookie('auth-cookie', {
            httpOnly: true,
            secure : true,
            sameSite: 'none', 
        });
        return res.status(200).json({ message: 'Logout successful' });
    }
}
