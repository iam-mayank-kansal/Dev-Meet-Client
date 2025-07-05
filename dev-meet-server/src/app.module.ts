import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './modules/auth/auth.controller';
import { UsersController } from './modules/users/users.controller';

@Module({
  imports: [
     ConfigModule.forRoot({
      isGlobal: true, // So it's available everywhere without importing again
    }),
  ],
  controllers: [AppController,AuthController,UsersController],
  providers: [],
})
export class AppModule {}
