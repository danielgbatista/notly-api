import type PasteEntity from '@domain/entities/paste.entity';

export default class NoteUpdateRequestBody {
  public id: string;
  public title: string;
  public content: string;
  public pasteId: string;
  public createdAt: Date;
  public paste: PasteEntity;
}
