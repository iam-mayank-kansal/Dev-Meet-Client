import { Controller, Get } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  @Get()  
  @ApiResponse({ status: 200, description: 'Server Running Fine.' })
  getBaseRoute(): string {
    return 'Server Running Fine!';
  }
}
