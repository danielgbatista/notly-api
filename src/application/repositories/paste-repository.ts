import type PasteEntity from '@domain/entities/paste.entity';

export default abstract class PasteRepository {
  public abstract create(userId: string, paste: PasteEntity): Promise<PasteEntity>;
  public abstract listAll(): Promise<PasteEntity[]>;
  public abstract getById(id: string): Promise<PasteEntity | null>;
  public abstract update(paste: PasteEntity, id: string): Promise<PasteEntity>;
  public abstract delete(id: string): Promise<PasteEntity>;
}
