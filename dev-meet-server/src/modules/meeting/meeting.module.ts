import { Module } from '@nestjs/common';
import { MeetingsService } from './meeting.service';
import { LiveMeetGateway } from './websocket.gateway';
import { MeetingsController } from './meeting.controller';

@Module({
  providers: [MeetingsService,LiveMeetGateway],
  controllers: [MeetingsController]
})
export class MeetingModule {}
