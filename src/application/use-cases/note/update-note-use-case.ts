import { Injectable, NotFoundException } from '@nestjs/common';
import NoteEntity from '@domain/entities/note.entity';
import NoteRepository from '@application/repositories/note-repository';
import type PasteEntity from '@domain/entities/paste.entity';
import { validate } from 'class-validator';
import PasteRepository from '@application/repositories/paste-repository';
import { EmptyFieldsException } from '@application/errors/emptyFields.exception';

export interface UpdateNoteInput {
  id: string;
  title: string;
  content: string;
  pasteId: string;
  createdAt: Date;
  paste: PasteEntity;
}

@Injectable()
export default class UpdateNoteUseCase {
  private readonly _noteRepository: NoteRepository;
  private readonly _pasteRepository: PasteRepository;

  public constructor(noteRepository: NoteRepository, pasteRepository: PasteRepository) {
    this._noteRepository = noteRepository;
    this._pasteRepository = pasteRepository;
  }

  public async handle(
    pasteId: string,
    noteId: string,
    input: UpdateNoteInput
  ): Promise<NoteEntity> {
    const note = new NoteEntity(input);

    if (await this.isValidFields(note)) throw new EmptyFieldsException();

    if ((await this.isValidNote(noteId)) || (await this.isValidPaste(pasteId)))
      throw new NotFoundException();

    await this._noteRepository.update(note, noteId);

    return note;
  }

  private async isValidPaste(id: string): Promise<boolean> {
    const paste = await this._pasteRepository.getById(id);

    return paste === null;
  }

  private async isValidNote(id: string): Promise<boolean> {
    const note = await this._noteRepository.getById(id);

    return note === null;
  }

  private async isValidFields(note: NoteEntity): Promise<boolean> {
    const structure = await validate(note);

    const minimumOfError = 1;

    return structure.length < minimumOfError;
  }
}
