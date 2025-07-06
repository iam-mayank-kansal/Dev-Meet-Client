import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from './config/config.module';
import mongooseConfig from './config/mongoose.config';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule, // Import the ConfigModule to load environment variables
    mongooseConfig, // Import the Mongoose configuration for MongoDB connection
    UsersModule
  ],

  // Register your controllers here
  controllers: [AppController],

  // Import your services here
  providers: [],
})
export class AppModule { }
