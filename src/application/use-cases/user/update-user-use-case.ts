import { ConflictDataException } from '@application/errors/conflictData.exception';
import { EmptyFieldsException } from '@application/errors/emptyFields.exception';
import { Injectable, NotFoundException } from '@nestjs/common';
import { validate } from 'class-validator';
import UserEntity from '@domain/entities/user.entity';
import UserRepository from '@application/repositories/user-repository';

interface UserUpdateInput {
  id: string;
  username: string;
  email: string;
  password: string;
}

@Injectable()
export default class UpdateUserUseCase {
  private readonly _userRepository: UserRepository;

  public constructor(userRepository: UserRepository) {
    this._userRepository = userRepository;
  }

  public async handle(id: string, input: UserUpdateInput): Promise<UserEntity> {
    const user = new UserEntity(input);

    if (await this.isValidId(id)) throw new NotFoundException();

    if (await this.isValidFields(user)) throw new EmptyFieldsException();

    if (await this.isValidEmail(user.email)) throw new ConflictDataException();

    const response = await this._userRepository.update(user, id);

    return response;
  }

  private async isValidId(id: string): Promise<boolean> {
    const user = await this._userRepository.getById(id);

    return user === null;
  }

  private async isValidFields(user: UserEntity): Promise<boolean> {
    const structure = await validate(user);

    const minimumOfError = 1;

    return structure.length < minimumOfError;
  }

  private async isValidEmail(email: string): Promise<boolean> {
    const user = await this._userRepository.getByEmail(email);

    return user !== null;
  }
}
