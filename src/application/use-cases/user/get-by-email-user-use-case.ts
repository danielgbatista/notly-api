import { Injectable } from '@nestjs/common';
import UserRepository from '@application/repositories/user-repository';
import type UserEntity from '@domain/entities/user.entity';

@Injectable()
export default class GetUserByEmailUseCase {
  private readonly _userRepository: UserRepository;

  public constructor(userRepository: UserRepository) {
    this._userRepository = userRepository;
  }

  public async handle(email: string): Promise<UserEntity | null> {
    const response = await this._userRepository.getByEmail(email);

    return response;
  }
}
