import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class MeetingsService {

    async createMeeting() {
        const newMeetingId = uuidv4();
        return { 'meetingId': newMeetingId };
    }

}