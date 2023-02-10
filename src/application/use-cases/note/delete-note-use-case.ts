import NoteRepository from "@application/repositories/note-repository";
import { NoteEntity } from "@domain/entities/note.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export default class DeleteNoteUseCase {
    constructor(
        private readonly _noteRepository: NoteRepository
    ) {}

    public async handle(pasteId: string, noteId: string): Promise<Boolean | NoteEntity> {
        return this._noteRepository.delete(noteId)
    }
}