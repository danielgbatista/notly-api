import { NoteEntity } from "@domain/entities/note.entity";

export default abstract class NoteRepository {
    abstract create(pasteId: string, note: NoteEntity) : Promise<NoteEntity>;
    abstract listAll() : Promise<NoteEntity[]>;
    abstract getById(id: string) : Promise<NoteEntity>;
    abstract update(note: NoteEntity, id: string) : Promise<NoteEntity>;
    abstract delete(id: string) : Promise<NoteEntity>;
}