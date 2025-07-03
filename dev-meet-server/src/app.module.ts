import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
     ConfigModule.forRoot({
      isGlobal: true, // So it's available everywhere without importing again
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
