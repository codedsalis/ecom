import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { RegisterDto } from '@ecom/auth/dtos/register.dto';
import * as bcrypt from 'bcrypt';
import { EmailService } from '../email/email.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly emailService: EmailService,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: number): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }

  findOneByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOneBy({ email });
  }

  async create(data: RegisterDto): Promise<User | null> {
    const isEmailExist = await this.userRepository.existsBy({
      email: data.email,
    });

    if (isEmailExist) {
      throw new BadRequestException('This email is already taken');
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);

    const user = new User();
    user.name = data.name;
    user.email = data.email;
    user.password = hashedPassword;

    await this.userRepository.save(user);

    this.emailService
      .send(
        `"${user.name}" <${user.email}>`,
        'Welcome to e-com app',
        './welcome',
        {
          name: user.name,
        },
      )
      .catch((error) => {
        Logger.debug(error);
      });

    return user;
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async verifyPasswordHash(
    password: string,
    plainPassword: string,
  ): Promise<boolean> {
    if (await bcrypt.compare(plainPassword, password)) {
      return true;
    }
    return false;
  }
}
