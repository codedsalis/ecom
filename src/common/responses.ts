import { ApiProperty } from '@nestjs/swagger';

class Success<T> {
  @ApiProperty({ default: 'success' })
  status: 'success';

  @ApiProperty({ default: 200 })
  statusCode: number;

  @ApiProperty()
  data: T;

  constructor(data: T, statusCode: number | null) {
    this.status = 'success';
    this.statusCode = statusCode ?? 200;
    this.data = data;
  }
}

class Error {
  status: 'error';
  statusCode: number;
  message: string;
}

class NotFound {
  status: 'error';
  statusCode: 404;
  message: string;
}

class Ok {
  status: 'success';
  statusCode: 200;
  message: string;
}

export { Success, Error, NotFound, Ok };
