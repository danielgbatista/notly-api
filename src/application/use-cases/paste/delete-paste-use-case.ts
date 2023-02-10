import PasteRepository from '@application/repositories/paste-repository';
import UserRepository from '@application/repositories/user-repository';
import { PasteEntity } from '@domain/entities/paste.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export default class DeletePasteUseCase {
    constructor(
        private readonly _pasteRepository: PasteRepository,
        private readonly _userRepository: UserRepository
    ) {}

    public async handle(userId: string, pasteId: string): Promise<boolean | PasteEntity> {
        const userExist = await this._userRepository.getById(userId)

        if(!userExist) throw new HttpException('Invalid userId', HttpStatus.BAD_REQUEST)

        return await this._pasteRepository.delete(pasteId)
    }
} 