import NoteRepository from "@application/repositories/note-repository";
import { NoteEntity } from "@domain/entities/note.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export default class ListAllNotesUseCase {
    constructor(
        private readonly _noteRepository: NoteRepository
    ) {}

    public async handle(): Promise<NoteEntity[]> {
        return this._noteRepository.listAll()
    }
}