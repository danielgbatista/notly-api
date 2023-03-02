import { APP_GUARD } from '@nestjs/core/constants';
import { AuthController } from '@infra/http/controllers/auth.controller';
import { JwtAuthGuard } from '@infra/http/guards/jwt-auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '@infra/http/guards/jwt.strategy';
import { LocalStrategy } from '@infra/http/guards/local.strategy';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from '@infra/prisma-database/prisma.module';
import { jwtConstants } from '@infra/http/values/constants';
import LoginAuthUseCase from '@application/use-cases/auth/login-auth-use-case';
import ValidateAuthUseCase from '@application/use-cases/auth/validate-auth-use-case';

@Module({
  controllers: [AuthController],
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '300s' }
    })
  ],
  providers: [
    LoginAuthUseCase,
    ValidateAuthUseCase,
    LocalStrategy,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    }
  ]
})
export class AuthModule {}
