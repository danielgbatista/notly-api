import { IsNotEmpty, IsString } from 'class-validator';
import { randomUUID } from 'crypto';
import type PasteEntity from './paste.entity';

export interface NoteProps {
  id?: string;
  title: string;
  content: string;
  pasteId: string;
  createdAt?: Date;
  updatedAt?: Date;
  paste?: PasteEntity;
}

export default class NoteEntity {
  private _id: string;

  @IsNotEmpty()
  private _title: string;

  @IsString()
  @IsNotEmpty()
  private _content: string;

  private _pasteId: string;
  private _createdAt: Date;
  private _updatedAt: Date;
  private _paste?: PasteEntity;

  public constructor(props: NoteProps) {
    this.id = props.id ?? randomUUID();
    this.title = props.title;
    this.paste = props.paste;
    this.content = props.content;
    this.pasteId = props.pasteId;
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? new Date();
  }

  public get id(): string {
    return this._id;
  }

  public set id(id: string) {
    this._id = id;
  }

  public get title(): string {
    return this._title;
  }

  public set title(title: string) {
    this._title = title;
  }

  public get content(): string {
    return this._content;
  }

  public set content(content: string) {
    this._content = content;
  }

  public get pasteId(): string {
    return this._pasteId;
  }

  public set pasteId(pasteId: string) {
    this._pasteId = pasteId;
  }

  public get createdAt(): Date {
    return this._createdAt;
  }

  public set createdAt(createdAt: Date) {
    this._createdAt = createdAt;
  }

  public get updatedAt(): Date {
    return this._updatedAt;
  }

  public set updatedAt(updatedAt: Date) {
    this._updatedAt = updatedAt;
  }

  public get paste(): PasteEntity | undefined {
    return this._paste;
  }

  public set paste(paste: PasteEntity | undefined) {
    this._paste = paste;
  }
}
