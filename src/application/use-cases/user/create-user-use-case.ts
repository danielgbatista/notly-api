import { ConflictDataException } from '@application/errors/conflictData.exception';
import { EmptyFieldsException } from '@application/errors/emptyFields.exception';
import { Injectable } from '@nestjs/common';
import { validate } from 'class-validator';
import UserEntity from '@domain/entities/user.entity';
import UserRepository from '@application/repositories/user-repository';

interface UserCreateInput {
  username: string;
  email: string;
  password: string;
}

@Injectable()
export default class CreateUserUseCase {
  private readonly _userRepository: UserRepository;

  public constructor(userRepository: UserRepository) {
    this._userRepository = userRepository;
  }

  public async handle(input: UserCreateInput): Promise<UserEntity> {
    const user = new UserEntity(input);

    if (await this.isValidStructure(user)) throw new EmptyFieldsException();

    if (await this.isValidEmail(user.email)) throw new ConflictDataException();

    const response = await this._userRepository.create(user);

    return response;
  }

  private async isValidEmail(email: string): Promise<boolean> {
    const user = await this._userRepository.getByEmail(email);

    return user !== null;
  }

  private async isValidStructure(user: UserEntity): Promise<boolean> {
    const structure = await validate(user);

    const minimumOfError = 1;

    return structure.length < minimumOfError;
  }
}
