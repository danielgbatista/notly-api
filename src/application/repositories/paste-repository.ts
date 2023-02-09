import { PasteEntity } from "@domain/entities/paste.entity";

export default abstract class PasteRepository {
    abstract create(userId: string, paste: PasteEntity) : Promise<PasteEntity>;
    abstract listAll() : Promise<PasteEntity[]>;
    abstract getById(id: string) : Promise<PasteEntity | null>;
    abstract update(paste: PasteEntity, id: string) : Promise<PasteEntity>;
    abstract delete(id: string) : Promise<boolean | PasteEntity>;
}