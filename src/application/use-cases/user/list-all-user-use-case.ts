import { Injectable, NotFoundException } from '@nestjs/common';
import UserRepository from '@application/repositories/user-repository';
import type UserEntity from '@domain/entities/user.entity';

@Injectable()
export default class ListAllUserUseCase {
  private readonly _userRepository: UserRepository;

  public constructor(userRepository: UserRepository) {
    this._userRepository = userRepository;
  }

  public async handle(): Promise<UserEntity[]> {
    const response = await this._userRepository.listAll();

    if (this.userNotFound(response)) throw new NotFoundException();

    return response;
  }

  private userNotFound(response: UserEntity[]): boolean {
    const minimumOfRecords = 1;

    return response.length < minimumOfRecords;
  }
}
