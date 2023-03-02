import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import PasteRepository from '@application/repositories/paste-repository';
import UserRepository from '@application/repositories/user-repository';
import type PasteEntity from '@domain/entities/paste.entity';

@Injectable()
export default class GetPasteByIdUseCase {
  private readonly _pasteRepository: PasteRepository;
  private readonly _userRepository: UserRepository;

  public constructor(pasteRepository: PasteRepository, userRepository: UserRepository) {
    this._userRepository = userRepository;
    this._pasteRepository = pasteRepository;
  }

  public async handle(userId: string, pasteId: string): Promise<PasteEntity | null> {
    if (await this.isValidUser(userId)) throw new NotFoundException();

    const response = await this._pasteRepository.getById(pasteId);

    if (this.isValidPaste(response)) throw new NotFoundException();

    return response;
  }

  private async isValidUser(id: string): Promise<boolean> {
    const user = await this._userRepository.getById(id);

    return user !== null;
  }

  private isValidPaste(paste: PasteEntity | null): boolean {
    return paste === null;
  }
}
