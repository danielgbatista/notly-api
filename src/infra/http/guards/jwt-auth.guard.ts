import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '@infra/http/decorators/public.decorator';
import { Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { ExecutionContext } from '@nestjs/common';
import type { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly _reflector: Reflector;

  public constructor(reflector: Reflector) {
    super();
    this._reflector = reflector;
  }

  public canActivate(context: ExecutionContext): Observable<boolean> | Promise<boolean> | boolean {
    const isPublic = this._reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass()
    ]);

    if (isPublic) return true;

    return super.canActivate(context);
  }
}
