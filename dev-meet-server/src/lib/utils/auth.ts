import { Logger } from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

export function validateRequest(req: Request): boolean {
    console.log("VALIDATE REQYEST :")
    const token = req.cookies['auth-cookie'];
    console.log("TOKEN : ", token);

    if (!token) return false;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("DECODED : ", decoded)
        req.user = decoded; // Attach user info to request
        return true;
    } catch (err) {
        return false;
    }
}
