import { Injectable, NotFoundException } from '@nestjs/common';
import PasteRepository from '@application/repositories/paste-repository';
import type PasteEntity from '@domain/entities/paste.entity';

@Injectable()
export default class ListAllPasteUseCase {
  private readonly _pasteRepository: PasteRepository;

  public constructor(pasteRepository: PasteRepository) {
    this._pasteRepository = pasteRepository;
  }

  public async handle(): Promise<PasteEntity[]> {
    const response = await this._pasteRepository.listAll();

    if (this.pasteNotFound(response)) throw new NotFoundException();

    return response;
  }

  private pasteNotFound(response: PasteEntity[]): boolean {
    const minimumOfRecords = 1;

    return response.length < minimumOfRecords;
  }
}
