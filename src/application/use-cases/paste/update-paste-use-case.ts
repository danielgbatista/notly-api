import PasteRepository from '@application/repositories/paste-repository';
import { PasteEntity } from '@domain/entities/paste.entity';
import { Injectable } from '@nestjs/common';

type PasteUpdateInput = {
    title: string,
    userId: string,
    createdAt: Date,
    updatedAt: Date
}

@Injectable()
export default class UpdatePasteUseCase {
    constructor(
        private readonly _pasteRepository: PasteRepository
    ) {}

    public async handle(id: string, input: PasteUpdateInput): Promise<PasteEntity> {
        const paste = new PasteEntity(input)

        await this._pasteRepository.update(paste, id)   
        
        return paste
    } 
}