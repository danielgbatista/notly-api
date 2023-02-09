import { NoteEntity } from "@domain/entities/note.entity";

export default abstract class NoteRepository {
    abstract create(note: NoteEntity) : Promise<NoteEntity>;
    abstract listAll() : Promise<NoteEntity[]>;
    abstract getById() : Promise<NoteEntity | null>;
    abstract update(note: NoteEntity, id: string) : Promise<NoteEntity>;
    abstract delete(id: string) : Promise<boolean>;
}