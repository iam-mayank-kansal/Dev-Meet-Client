import { HttpException } from "@nestjs/common";
import mongoose from "mongoose";

export default function isValidateUserId(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return new HttpException('Invalid user ID format', 400);
    }
}