import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export abstract class BaseResponse<T> {
  @ApiProperty({ example: 'success' })
  status: string;

  @ApiProperty({ example: 200 })
  statusCode: number;

  constructor(
    partial: Partial<T>,
    statusCode: number = HttpStatus.OK,
    status: string = 'success',
  ) {
    Object.assign(this, partial);
    this.statusCode = statusCode;
    this.status = status;
  }

  static toModel<U, T extends BaseResponse<U>>(
    this: new (partial: U, statusCode?: number, status?: string) => T,
    plainObject: U,
    statusCode: number = HttpStatus.OK,
    status: string = 'success',
  ): T {
    return new this(plainObject, statusCode, status);
  }
}
