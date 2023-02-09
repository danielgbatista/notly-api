import PasteRepository from '@application/repositories/paste-repository';
import { PasteEntity } from '@domain/entities/paste.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class ListAllPasteUseCase {
    constructor(
        private readonly _pasteRepository: PasteRepository
    ) {}

    public async handle(): Promise<PasteEntity[]> {
        return this._pasteRepository.listAll()
    }
}