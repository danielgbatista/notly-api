import { EmptyFieldsException } from '@application/errors/emptyFields.exception';
import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { validate } from 'class-validator';
import PasteEntity from '@domain/entities/paste.entity';
import PasteRepository from '@application/repositories/paste-repository';
import UserRepository from '@application/repositories/user-repository';

interface PasteUpdateInput {
  id: string;
  title: string;
  userId: string;
  content: string;
  createdAt: Date;
}

@Injectable()
export default class UpdatePasteUseCase {
  private readonly _pasteRepository: PasteRepository;
  private readonly _userRepository: UserRepository;

  public constructor(pasteRepository: PasteRepository, userRepository: UserRepository) {
    this._pasteRepository = pasteRepository;
    this._userRepository = userRepository;
  }

  public async handle(
    userId: string,
    pasteId: string,
    input: PasteUpdateInput
  ): Promise<PasteEntity> {
    const paste = new PasteEntity(input);

    if (await this.isValidUser(userId)) throw new NotFoundException();

    if (await this.isValidFields(paste)) throw new EmptyFieldsException();

    const response = await this._pasteRepository.update(paste, pasteId);

    return response;
  }

  private async isValidUser(id: string): Promise<boolean> {
    const user = await this._userRepository.getById(id);

    return user === null;
  }

  private async isValidFields(paste: PasteEntity): Promise<boolean> {
    const structure = await validate(paste);

    const minimumOfError = 1;

    return structure.length < minimumOfError;
  }
}
