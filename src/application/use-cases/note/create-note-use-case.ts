import NoteRepository from "@application/repositories/note-repository";
import { NoteEntity } from "@domain/entities/note.entity";
import { Injectable } from "@nestjs/common";

export type CreateNoteInput = {
    title : string;
    content : string;
    pasteId : string;
    createdAt: Date;
    updatedAt: Date;
}

@Injectable()
export default class CreateNoteUseCase {
    constructor(
        private readonly _noteRepository: NoteRepository
    ){}

    public async handle(pasteId: string, input: CreateNoteInput): Promise<NoteEntity> {
        const note = new NoteEntity(input)

        await this._noteRepository.create(pasteId, note)

        return note
    }
}