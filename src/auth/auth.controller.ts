import { BaseController } from '@ecom/common/base.controller';
import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { RegisterDto } from './dtos/register.dto';
import { AuthService } from './auth.service';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Success } from '@ecom/common/responses';
import { LoginDto } from './dtos/Login.dto';
import { LoginResponse } from './dtos/login-response.dto';
import { Response } from 'express';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController extends BaseController {
  constructor(private readonly authService: AuthService) {
    super();
  }

  @Post('/register')
  @ApiBody({ type: RegisterDto })
  @ApiResponse({ type: Success<RegisterDto>, status: 201 })
  async register(@Body() registerDto: RegisterDto, @Res() response: Response) {
    const user = await this.authService.register(registerDto);

    return response.status(HttpStatus.CREATED).json({
      ...user,
    });
  }

  @Post('/login')
  @ApiBody({ type: LoginDto })
  @ApiResponse({ type: LoginResponse, status: HttpStatus.OK })
  async login(@Body() loginDto: LoginDto, @Res() response: Response) {
    const accessToken: string = await this.authService.login(loginDto);

    return response.status(HttpStatus.OK).json({
      status: 'success',
      statusCode: HttpStatus.OK,
      accessToken,
    });
  }
}
