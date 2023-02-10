import PasteRepository from '@application/repositories/paste-repository';
import UserRepository from '@application/repositories/user-repository';
import { PasteEntity } from '@domain/entities/paste.entity';
import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';

type PasteUpdateInput = {
    title: string,
    userId: string,
    createdAt: Date,
    updatedAt: Date
}

@Injectable()
export default class UpdatePasteUseCase {
    constructor(
        private readonly _pasteRepository: PasteRepository,
        private readonly _userRepository: UserRepository
    ) {}

    public async handle(userId: string, pasteId: string, input: PasteUpdateInput): Promise<PasteEntity> {
        const userExist = await this._userRepository.getById(userId)

        if(!userExist) throw new HttpException('Invalid userId', HttpStatus.BAD_REQUEST)

        const paste = new PasteEntity(input)

        await this._pasteRepository.update(paste, pasteId)   
        
        return paste
    } 
}