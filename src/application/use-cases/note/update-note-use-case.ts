import NoteRepository from "@application/repositories/note-repository";
import { NoteEntity } from "@domain/entities/note.entity";
import { Injectable } from "@nestjs/common";

export type UpdateNoteInput = {
    id?: string;
    title : string;
    content : string; 
    pasteId : string;
    createdAt: Date;
    updatedAt: Date;
}

@Injectable()
export default class UpdateNoteUseCase {
    constructor(
        private readonly _noteRepository: NoteRepository
    ){}

    public async handle(pasteId: string, noteId: string, input: UpdateNoteInput) : Promise<NoteEntity> {
        const note = new NoteEntity(input)
        await this._noteRepository.update(note, noteId);
        return note
    }
}