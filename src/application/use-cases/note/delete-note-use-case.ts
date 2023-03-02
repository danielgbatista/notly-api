import { Injectable, NotFoundException } from '@nestjs/common';
import NoteRepository from '@application/repositories/note-repository';
import type NoteEntity from '@domain/entities/note.entity';
import PasteRepository from '@application/repositories/paste-repository';

@Injectable()
export default class DeleteNoteUseCase {
  private readonly _noteRepository: NoteRepository;
  private readonly _pasteRepository: PasteRepository;

  public constructor(noteRepository: NoteRepository, pasteRepository: PasteRepository) {
    this._noteRepository = noteRepository;
    this._pasteRepository = pasteRepository;
  }

  public async handle(pasteId: string, noteId: string): Promise<NoteEntity> {
    if(await this.isValidNote(noteId) || await this.isValidPaste(pasteId)) throw new NotFoundException();

    const response = await this._noteRepository.delete(noteId);

    return response;
  }

  private async isValidPaste(id: string): Promise<boolean> {
    const paste = await this._pasteRepository.getById(id);

    return paste !== null;
  }

  private async isValidNote(id: string): Promise<boolean> {
    const note = await this._noteRepository.getById(id);

    return note !== null;
  }

}
