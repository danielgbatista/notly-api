import { EmptyFieldsException } from '@application/errors/emptyFields.exception';
import { Injectable, NotFoundException } from '@nestjs/common';
import { validate } from 'class-validator';
import PasteEntity from '@domain/entities/paste.entity';
import PasteRepository from '@application/repositories/paste-repository';
import UserRepository from '@application/repositories/user-repository';
import type UserEntity from '@domain/entities/user.entity';

interface CreatePasteInput {
  title: string;
  userId: string;
  user: UserEntity;
}

@Injectable()
export default class CreatePasteUseCase {
  private readonly _pasteRepository: PasteRepository;
  private readonly _userRepository: UserRepository;

  public constructor(pasteRepository: PasteRepository, userRepository: UserRepository) {
    this._userRepository = userRepository;
    this._pasteRepository = pasteRepository;
  }

  public async handle(userId: string, input: CreatePasteInput): Promise<PasteEntity> {
    const paste = new PasteEntity(input);

    if (await this.isValidUser(userId)) throw new NotFoundException();

    if (await this.isValidStructure(paste)) throw new EmptyFieldsException();

    const response = await this._pasteRepository.create(userId, paste);

    return response;
  }

  private async isValidUser(id: string): Promise<boolean> {
    const user = await this._userRepository.getById(id);

    return user !== null;
  }

  private async isValidStructure(paste: PasteEntity): Promise<boolean> {
    const structure = await validate(paste);

    const minimumOfError = 1;

    return structure.length < minimumOfError;
  }
}
