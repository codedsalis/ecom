import { Injectable, Logger } from '@nestjs/common';
import { RegisterDto } from './dtos/register.dto';

@Injectable()
export class AuthService {
  register(registerDto: RegisterDto) {
    Logger.debug(registerDto);
  }
}
