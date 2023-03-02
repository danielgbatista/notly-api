import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import UserRepository from '@application/repositories/user-repository';
import type UserEntity from '@domain/entities/user.entity';

@Injectable()
export class AuthService {
  private readonly _userRepository: UserRepository;
  private readonly _jwtService: JwtService;

  public constructor(userRepository: UserRepository, jwtService: JwtService) {
    this._userRepository = userRepository;
    this._jwtService = jwtService;
  }

  public async validateUser(email: string, pass: string): Promise<UserEntity> {
    const userExist = await this._userRepository.getByEmail(email);

    if (userExist !== null && userExist.password === pass) return userExist;

    throw new UnauthorizedException();
  }

  public login(user: { id: string; email: string }): { access_token: string } {
    const payload = { sub: user.id, username: user.email };

    return {
      access_token: this._jwtService.sign(payload)
    };
  }
}
