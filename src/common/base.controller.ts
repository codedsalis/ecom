import { response } from 'express';
import { Error, NotFound, Ok, Success } from './responses';
import { HttpStatus } from '@nestjs/common';

export class BaseController {
  success<T>(data: T, statusCode: number | null): Success<T> {
    return new Success(data, statusCode);
  }

  testResponse<T>(data: T) {
    return response.status(HttpStatus.OK).json(data);
  }

  ok(message: string): Ok {
    return {
      status: 'success',
      statusCode: 200,
      message,
    };
  }

  notFound(message: string): NotFound {
    return {
      status: 'error',
      statusCode: 404,
      message,
    };
  }

  error(message: string, statusCode: number): Error {
    return {
      status: 'error',
      statusCode,
      message,
    };
  }
}
