import { Injectable, NotFoundException } from '@nestjs/common';
import NoteEntity from '@domain/entities/note.entity';
import NoteRepository from '@application/repositories/note-repository';
import PasteRepository from '@application/repositories/paste-repository';
import type PasteEntity from '@domain/entities/paste.entity';

export interface CreateNoteInput {
  title: string;
  content: string;
  pasteId: string;
  paste: PasteEntity;
}

@Injectable()
export default class CreateNoteUseCase {
  private readonly _noteRepository: NoteRepository;
  private readonly _pasteRepository: PasteRepository;

  public constructor(noteRepository: NoteRepository, pasteRepository: PasteRepository) {
    this._noteRepository = noteRepository;
    this._pasteRepository = pasteRepository;
  }

  public async handle(pasteId: string, input: CreateNoteInput): Promise<NoteEntity> {
    const note = new NoteEntity(input);

    if(await this.isValidPaste(pasteId)) throw new NotFoundException();

    await this._noteRepository.create(pasteId, note);

    return note;
  }

  private async isValidPaste(id: string): Promise<boolean> {
    const paste = await this._pasteRepository.getById(id);

    return paste !== null;
  }
}
