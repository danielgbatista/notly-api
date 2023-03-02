import { Injectable, NotFoundException } from '@nestjs/common';
import UserRepository from '@application/repositories/user-repository';
import type UserEntity from '@domain/entities/user.entity';

@Injectable()
export default class GetUserByIdUseCase {
  private readonly _userRepository: UserRepository;

  public constructor(userRepository: UserRepository) {
    this._userRepository = userRepository;
  }

  public async handle(id: string): Promise<UserEntity | null> {
    const response = await this._userRepository.getById(id);

    if (this.isValidId(response)) throw new NotFoundException();

    return response;
  }

  private isValidId(user: UserEntity | null): boolean {
    return user === null;
  }
}
