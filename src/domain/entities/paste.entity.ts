import { NoteEntity } from "./note.entity";
import { UserEntity } from "./user.entity";

export type PasteProps = {
  id?: string;
  title: string;
  userId: string;
  createdAt: Date;
  updatedAt?: Date;
  user?: UserEntity;
  notes?: NoteEntity[]
}

export class PasteEntity {
  id: string;
  title: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  user?: UserEntity;
  notes?: NoteEntity[]

  constructor(props: PasteProps) {
    this.id = props.id;
    this.title = props.title;
    this.userId = props.userId;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.user = props.user;
    this.notes = props.notes;
  }
}
