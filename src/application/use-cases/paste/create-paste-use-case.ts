import PasteRepository from '@application/repositories/paste-repository';
import UserRepository from '@application/repositories/user-repository';
import { NoteEntity } from '@domain/entities/note.entity';
import { PasteEntity } from '@domain/entities/paste.entity';
import { UserEntity } from '@domain/entities/user.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'

type CreatePasteInput = {
    title: string
    userId: string 
    createdAt: Date
    updatedAt: Date
}

@Injectable()
export default class CreatePasteUseCase {
    constructor(
        private readonly _pasteRepository: PasteRepository,
        private readonly _userRepository: UserRepository
    ) {}

    public async handle(userId: string, input: CreatePasteInput) : Promise<PasteEntity> {

        const user = await this._userRepository.getById(userId)

        if(!user) throw new HttpException('Invalid userId', HttpStatus.BAD_REQUEST)

        const paste = new PasteEntity(input)

        const response = await this._pasteRepository.create(userId, paste)

        return response
    }
}