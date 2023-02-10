import NoteRepository from "@application/repositories/note-repository";
import { NoteEntity } from "@domain/entities/note.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export default class GetNoteByIdUseCase {
    constructor(
        private readonly _noteRepository: NoteRepository
    ) {}

    public async handle(pasteId: string, noteId: string): Promise<NoteEntity> {
        return await this._noteRepository.getById(noteId)
    }
}