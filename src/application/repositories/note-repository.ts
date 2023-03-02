import type NoteEntity from '@domain/entities/note.entity';

export default abstract class NoteRepository {
  public abstract create(pasteId: string, note: NoteEntity): Promise<NoteEntity>;
  public abstract listAll(): Promise<NoteEntity[]>;
  public abstract getById(id: string): Promise<NoteEntity | null>;
  public abstract update(note: NoteEntity, id: string): Promise<NoteEntity>;
  public abstract delete(id: string): Promise<NoteEntity>;
}
