import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { NoteMapper } from './note-mapper';
import { UserMapper } from './user-mapper';
import PasteEntity from '@domain/entities/paste.entity';
import type { Note, Paste, User } from '@prisma/client';

@Injectable()
export class PasteMapper {
  private readonly _noteMapper: NoteMapper;
  private readonly _userMapper: UserMapper;

  public constructor(
    @Inject(forwardRef(() => UserMapper))
    userMapper: UserMapper,
    @Inject(forwardRef(() => NoteMapper))
    noteMapper: NoteMapper
  ) {
    this._userMapper = userMapper;
    this._noteMapper = noteMapper;
  }

  public toModel(paste: PasteEntity): Paste {
    const model: Paste = {
      createdAt: paste.createdAt,
      id: paste.id,
      title: paste.title,
      updatedAt: paste.updatedAt,
      userId: paste.userId
    };

    return model;
  }

  public toEntity(paste: Paste): PasteEntity {
    const entity = new PasteEntity({
      createdAt: new Date(paste.createdAt),
      id: paste.id,
      title: paste.title,
      updatedAt: new Date(paste.updatedAt),
      userId: paste.userId
    });

    return entity;
  }

  public toEntityWithUserAndNotes(paste: Paste, notes: Note[], user: User): PasteEntity {
    const entity = new PasteEntity({
      createdAt: new Date(paste.createdAt),
      id: paste.id,
      note: this._noteMapper.toEntityList(notes),
      title: paste.title,
      updatedAt: new Date(paste.updatedAt),
      user: this._userMapper.toEntity(user),
      userId: paste.userId
    });

    return entity;
  }

  public toModelList(pastes: PasteEntity[]): Paste[] {
    return pastes.map((paste) => this.toModel(paste));
  }

  public toEntityList(pastes: Paste[]): PasteEntity[] {
    return pastes.map((paste) => this.toEntity(paste));
  }
}
