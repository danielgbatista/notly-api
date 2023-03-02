import { HttpException, HttpStatus } from '@nestjs/common';

export class ConflictDataException extends HttpException {
  public constructor() {
    super('Algum dos dados já está em uso.', HttpStatus.BAD_REQUEST);
  }
}
