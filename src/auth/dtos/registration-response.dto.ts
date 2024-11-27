import { BaseResponse } from '@ecom/common/dtos/base-response.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegistrationResponse extends BaseResponse<RegistrationResponse> {
  @ApiProperty({ example: 'John Doe' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'user@example.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'user' })
  @IsNotEmpty()
  role: string;
}
