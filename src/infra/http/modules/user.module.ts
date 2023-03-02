import { AuthModule } from './auth.module';
import { BaseExceptionFilter } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { PrismaModule } from '@infra/prisma-database/prisma.module';
import { UserController } from '@infra/http/controllers/user.controller';
import CreateUserUseCase from '@application/use-cases/user/create-user-use-case';
import DeleteUserUseCase from '@application/use-cases/user/delete-user-use-case';
import GetUserByIdUseCase from '@application/use-cases/user/get-one-user-use-case';
import ListAllUserUseCase from '@application/use-cases/user/list-all-user-use-case';
import UpdateUserUseCase from '@application/use-cases/user/update-user-use-case';

@Module({
  controllers: [UserController],
  imports: [PrismaModule, AuthModule, BaseExceptionFilter],
  providers: [
    CreateUserUseCase,
    ListAllUserUseCase,
    GetUserByIdUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase
  ]
})
export default class UserModule {}
