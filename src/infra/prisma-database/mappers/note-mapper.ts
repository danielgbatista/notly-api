import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { PasteMapper } from './paste-mapper';
import NoteEntity from '@domain/entities/note.entity';
import type { Note, Paste } from '@prisma/client';

@Injectable()
export class NoteMapper {
  private readonly _pasteMapper: PasteMapper;

  public constructor(
    @Inject(forwardRef(() => PasteMapper))
    pasteMapper: PasteMapper
  ) {
    this._pasteMapper = pasteMapper;
  }

  public toModel(note: NoteEntity): Note {
    const model: Note = {
      content: note.content,
      createdAt: note.createdAt,
      id: note.id,
      pasteId: note.pasteId,
      title: note.title,
      updatedAt: note.updatedAt
    };

    return model;
  }

  public toEntityWithPaste(note: Note, paste: Paste): NoteEntity {
    const entity = new NoteEntity({
      content: note.content,
      createdAt: new Date(note.createdAt),
      id: note.id,
      paste: this._pasteMapper.toEntity(paste),
      pasteId: note.pasteId,
      title: note.title,
      updatedAt: new Date(note.updatedAt)
    });

    return entity;
  }

  public toEntity(note: Note): NoteEntity {
    const entity = new NoteEntity({
      content: note.content,
      createdAt: new Date(note.createdAt),
      id: note.id,
      pasteId: note.pasteId,
      title: note.title,
      updatedAt: new Date(note.updatedAt)
    });

    return entity;
  }

  public toModelList(notes: NoteEntity[]): Note[] {
    return notes.map((note) => this.toModel(note));
  }

  public toEntityList(notes: Note[]): NoteEntity[] {
    return notes.map((note) => this.toEntity(note));
  }
}
