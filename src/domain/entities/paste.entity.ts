import { IsNotEmpty, IsString, IsTimeZone } from 'class-validator';
import { randomUUID } from 'crypto';
import type NoteEntity from './note.entity';
import type UserEntity from './user.entity';

export interface PasteProps {
  id?: string;
  title: string;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
  user?: UserEntity;
  note?: NoteEntity[];
}

export default class PasteEntity {
  private _id: string;

  @IsString()
  @IsNotEmpty()
  private _title: string;

  private _userId: string;

  @IsTimeZone()
  private _createdAt: Date;

  @IsTimeZone()
  private _updatedAt: Date;

  private _user?: UserEntity;
  private _note: NoteEntity[];

  public constructor(props: PasteProps) {
    this.id = props.id ?? randomUUID();
    this.title = props.title;
    this.userId = props.userId;
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? new Date();
    this.user = props.user;
    this.note = props.note ?? [];
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

  public get userId(): string {
    return this._userId;
  }

  public set userId(userId: string) {
    this._userId = userId;
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

  public get user(): UserEntity | undefined {
    return this._user;
  }

  public set user(user: UserEntity | undefined) {
    this._user = user;
  }

  public get note(): NoteEntity[] {
    return this._note;
  }

  public set note(note: NoteEntity[]) {
    this._note = note;
  }
}
