import { PrismaModule } from '@infra/prisma-database/prisma.module';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from '@infra/http/controllers/auth.controller';
import { AuthService } from '../services/auth.service';
import { LocalStrategy } from '../guards/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../values/constants';
import { JwtStrategy } from '../guards/jwt.strategy';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core/constants';

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '300s' },
    })
  ],
  controllers: [AuthController],
  providers: [ 
    AuthService,
    LocalStrategy,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [AuthService]
})
export class AuthModule {}
