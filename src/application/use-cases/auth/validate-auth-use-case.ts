import { Injectable } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions/unauthorized.exception';
import UserRepository from '@application/repositories/user-repository';
import type UserEntity from '@domain/entities/user.entity';

@Injectable()
export default class ValidateAuthUseCase {
  private readonly _userRepository: UserRepository;

  public constructor(userRepository: UserRepository) {
    this._userRepository = userRepository;
  }

  public async handle(email: string, password: string): Promise<UserEntity> {
    const user = await this._userRepository.getByEmail(email);

    if (user !== null && user.password === password) return user;

    throw new UnauthorizedException();
  }
}
