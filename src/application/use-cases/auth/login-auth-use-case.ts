import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export default class LoginAuthUseCase {
  private readonly _jwtService: JwtService;

  public constructor(jwtService: JwtService) {
    this._jwtService = jwtService;
  }

  public handle(user: { email: string; id: string }): { access_token: string } {
    const payload = { sub: user.id, username: user.email };

    return {
      access_token: this._jwtService.sign(payload)
    };
  }
}
