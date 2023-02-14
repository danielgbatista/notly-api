import { PasteEntity } from "./paste.entity";

export type NoteProps = {
  id?: string;
  title : string;
  content : string;
  pasteId : string;
  createdAt: Date;
  updatedAt: Date;
  paste?: PasteEntity;
}

export class NoteEntity {
  id: string;
  title: string;
  content: string;
  pasteId: string;
  createdAt: Date;
  updatedAt: Date;
  paste?: PasteEntity;

  constructor(props: NoteProps){
    this.id = props.id;
    this.title = props.title;
    this.paste = props.paste;
    this.content = props.content;
    this.pasteId = props.pasteId;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}
