import PasteRepository from '@application/repositories/paste-repository';
import UserRepository from '@application/repositories/user-repository';
import { PasteEntity } from '@domain/entities/paste.entity';
import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';

@Injectable()
export default class GetPasteByIdUseCase {
    constructor(
        private readonly _pasteRepository: PasteRepository,
        private readonly _userRepository: UserRepository
    ) {}

    public async handle(userId: string, pasteId: string): Promise<PasteEntity> {
        const userExist = await this._userRepository.getById(userId)

        if(!userExist) throw new HttpException('Invalid userId', HttpStatus.BAD_REQUEST)

        return await this._pasteRepository.getById(pasteId)
    }
}