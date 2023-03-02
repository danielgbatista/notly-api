import { HttpException, HttpStatus } from '@nestjs/common';

export class EmptyFieldsException extends HttpException {
  public constructor() {
    super('Exist empty properties', HttpStatus.BAD_REQUEST);
  }
}
