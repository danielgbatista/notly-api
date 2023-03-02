import { Injectable, NotFoundException } from '@nestjs/common';
import NoteRepository from '@application/repositories/note-repository';
import type NoteEntity from '@domain/entities/note.entity';

@Injectable()
export default class ListAllNotesUseCase {
  private readonly _noteRepository: NoteRepository;

  public constructor(noteRepository: NoteRepository) {
    this._noteRepository = noteRepository;
  }

  public async handle(): Promise<NoteEntity[]> {
    const response = await this._noteRepository.listAll();

    if(this.noteNotFound(response)) throw new NotFoundException();

    return response;
  }

  private noteNotFound(response: NoteEntity[]): boolean {
    const minimumOfRecords = 1;

    return response.length < minimumOfRecords;
  }
}
