import type PasteEntity from '@domain/entities/paste.entity';

export default class NoteCreateRequestBody {
  public title: string;
  public content: string;
  public pasteId: string;
  public paste: PasteEntity;
}
