import { AuthEntity } from '@domain/entities/auth.entity';
import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@infra/http/guards/jwt-auth.guard';
import { LocalAuthGuard } from '@infra/http/guards/local-auth.guard';
import { Public } from '@infra/http/decorators/public.decorator';
import AuthPresenter, { AuthCustomResponse } from '@infra/http/presenter/auth-presente';
import LoginAuthUseCase from '@application/use-cases/auth/login-auth-use-case';

@Controller('auth')
export class AuthController {
  private readonly _loginAuthUseCase: LoginAuthUseCase;

  public constructor(loginAuthUseCase: LoginAuthUseCase) {
    this._loginAuthUseCase = loginAuthUseCase;
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @Public()
  public login(@Request() user: { id: string; email: string }): { access_token: string } {
    const response = this._loginAuthUseCase.handle(user);

    return response;
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  public getProfile(@Request() user: AuthEntity): AuthCustomResponse {
    return new AuthPresenter().toHttpResponse(user);
  }
}
