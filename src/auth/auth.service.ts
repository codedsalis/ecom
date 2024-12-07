import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterDto } from './dtos/register.dto';
import { UserService } from '@ecom/user/user.service';
import { User } from '@ecom/user/user.entity';
import { LoginDto } from './dtos/Login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<User | null> {
    return await this.userService.create(registerDto);
  }

  async login(loginDto: LoginDto) {
    const user = await this.userService.findOneByEmail(loginDto.email);

    if (!user) {
      throw new BadRequestException('Invalid credentials!!!!');
    }

    const verifyPassword = await this.userService.verifyPasswordHash(
      user.password,
      loginDto.password,
    );

    if (verifyPassword) {
      const payload = {
        sub: user.id,
        email: user.email,
        roles: user.roles,
      };

      return await this.jwtService.signAsync(payload);
    }

    throw new BadRequestException('Invalid credentials');
  }
}
