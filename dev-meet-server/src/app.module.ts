import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from './config/config.module';
import mongooseConfig from './config/mongoose.config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { MeetingModule } from './modules/meeting/meeting.module';

@Module({
  imports: [
    ConfigModule, // Import the ConfigModule to load environment variables
    mongooseConfig, // Import the Mongoose configuration for MongoDB connection
    UsersModule,
    AuthModule,
    MeetingModule
  ],

  // Register your controllers here
  controllers: [AppController],

  // Import your services here
  providers: [],
})
export class AppModule { }
