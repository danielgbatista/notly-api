import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import NoteRepository from '@application/repositories/note-repository';
import PasteRepository from '@application/repositories/paste-repository';
import type NoteEntity from '@domain/entities/note.entity';

@Injectable()
export default class GetNoteByIdUseCase {
  private readonly _noteRepository: NoteRepository;
  private readonly _pasteRepository: PasteRepository;

  public constructor(noteRepository: NoteRepository, pasteRepository: PasteRepository) {
    this._noteRepository = noteRepository;
    this._pasteRepository = pasteRepository;
  }

  public async handle(pasteId: string, noteId: string): Promise<NoteEntity | null> {

    const response = await this._noteRepository.getById(noteId);

    if (await this.isValidPaste(pasteId) || this.isValidNote(response)) throw new NotFoundException();

    return response;
  }

  private async isValidPaste(id: string): Promise<boolean> {
    const paste = await this._pasteRepository.getById(id);

    return paste !== null;
  }

  private isValidNote(note: NoteEntity | null): boolean {
    return note === null;
  }
}
