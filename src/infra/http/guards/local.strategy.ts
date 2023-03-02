import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import ValidateAuthUseCase from '@application/use-cases/auth/validate-auth-use-case';
import type UserEntity from '@domain/entities/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private readonly _validateAuthUseCase: ValidateAuthUseCase;

  public constructor(validateAuthUseCase: ValidateAuthUseCase) {
    super({
      passwordField: 'password',
      usernameField: 'email'
    });
    this._validateAuthUseCase = validateAuthUseCase;
  }

  public async validate(email: string, password: string): Promise<UserEntity | null> {
    const user = await this._validateAuthUseCase.handle(email, password);

    return user;
  }
}
