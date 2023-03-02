import { Injectable, NotFoundException } from '@nestjs/common';
import UserRepository from '@application/repositories/user-repository';
import type UserEntity from '@domain/entities/user.entity';

@Injectable()
export default class DeleteUserUseCase {
  private readonly _userRepository: UserRepository;

  public constructor(userRepository: UserRepository) {
    this._userRepository = userRepository;
  }

  public async handle(id: string): Promise<UserEntity> {
    if (await this.isValidId(id)) throw new NotFoundException();

    const response = await this._userRepository.delete(id);

    return response;
  }

  private async isValidId(id: string): Promise<boolean> {
    const user = await this._userRepository.getById(id);

    return user === null;
  }
}
