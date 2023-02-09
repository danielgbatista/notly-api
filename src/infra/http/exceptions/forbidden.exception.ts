import { HttpException, HttpStatus } from '@nestjs/common'

export class ForbiddenException extends HttpException {
    constructor() {
        super(HttpException.createBody, HttpStatus.FORBIDDEN);
    }
}