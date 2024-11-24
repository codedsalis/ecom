import { BaseController } from '@ecom/common/base.controller';
import { Body, Controller, Post } from '@nestjs/common';
import { RegisterDto } from './dtos/register.dto';
import { AuthService } from './auth.service';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Success } from '@ecom/common/responses';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController extends BaseController {
  constructor(private readonly authService: AuthService) {
    super();
  }

  @Post('/register')
  @ApiBody({ type: RegisterDto })
  @ApiResponse({ type: Success<RegisterDto>, status: 201 })
  register(@Body() registerDto: RegisterDto) {
    this.authService.register(registerDto);

    return this.success<RegisterDto>(registerDto, 201);
  }
}
