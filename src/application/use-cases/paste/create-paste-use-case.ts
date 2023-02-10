import PasteRepository from '@application/repositories/paste-repository';
import UserRepository from '@application/repositories/user-repository';
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

        const userExist = await this._userRepository.getById(userId)

        if(!userExist) throw new HttpException('Invalid userId', HttpStatus.BAD_REQUEST)

        const paste = new PasteEntity(input)

        await this._pasteRepository.create(userId, paste)

        return paste
    }
}