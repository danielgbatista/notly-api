import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { PasteMapper } from './paste-mapper';
import UserEntity from '@domain/entities/user.entity';
import type { Paste, User } from '@prisma/client';

@Injectable()
export class UserMapper {
  private readonly _pasteMapper: PasteMapper;

  public constructor(
    @Inject(forwardRef(() => PasteMapper))
    pasteMapper: PasteMapper
  ) {
    this._pasteMapper = pasteMapper;
  }

  public toModel(user: UserEntity): User {
    const model: User = {
      email: user.email,
      id: user.id,
      password: user.password,
      username: user.username
    };

    return model;
  }

  public toEntity(user: User): UserEntity {
    const entity = new UserEntity({
      email: user.email,
      id: user.id,
      password: user.password,
      username: user.username
    });

    return entity;
  }

  public toEntityWithPaste(user: User, pastes: Paste[]): UserEntity {
    const entity = new UserEntity({
      email: user.email,
      id: user.id,
      password: user.password,
      paste: pastes.map((paste: Paste) => this._pasteMapper.toEntity(paste)),
      username: user.username
    });

    return entity;
  }

  public toModelList(users: UserEntity[]): User[] {
    return users.map((user) => this.toModel(user));
  }

  public toEntityList(users: User[]): UserEntity[] {
    return users.map((user) => this.toEntity(user));
  }
}
