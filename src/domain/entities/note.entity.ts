export type NoteProps = {
  id : string;
  title : string;
  content : string;
  pasteId : string;
  createdAt: Date;
  updatedAt: Date;
}

export class NoteEntity {
  id: string;
  title: string;
  content: string;
  pasteId: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(props: NoteProps){
    this.id = props.id;
    this.title = props.title;
    this.content = props.content;
    this.pasteId = props.pasteId;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}
