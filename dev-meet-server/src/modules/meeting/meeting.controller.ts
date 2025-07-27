import { Controller, Post, UseGuards } from '@nestjs/common';
import { MeetingsService } from './meeting.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('meetings') // This means all routes in this controller start with /meetings
export class MeetingsController {
    constructor(private readonly meetingsService: MeetingsService) { }

    @UseGuards(AuthGuard('jwt'))
    @Post('create') 
    create() {
        return this.meetingsService.createMeeting();
    }
}