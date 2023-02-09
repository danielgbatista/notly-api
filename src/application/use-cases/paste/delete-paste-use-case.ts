import PasteRepository from '@application/repositories/paste-repository';
import { PasteEntity } from '@domain/entities/paste.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class DeletePasteUseCase {
    constructor(
        private readonly _pasteRepository: PasteRepository
    ) {}

    public async handle(id: string): Promise<boolean | PasteEntity> {
        return await this._pasteRepository.delete(id)
    }
} 