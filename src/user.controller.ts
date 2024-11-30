import { Controller, Get } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Get()
  login(): string {
    return 'Hello!';
  }
}
