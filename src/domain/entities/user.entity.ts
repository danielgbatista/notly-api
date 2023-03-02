import { IsEmail, IsNotEmpty } from 'class-validator';
import { randomUUID } from 'crypto';
import type PasteEntity from './paste.entity';

export interface UserProps {
  id?: string;
  username: string;
  password: string;
  email: string;
  paste?: PasteEntity[];
}

export default class UserEntity {
  private _id: string;

  @IsNotEmpty({ message: 'Username is required' })
  private _username: string;

  @IsNotEmpty({ message: 'Password is required' })
  private _password: string;

  @IsNotEmpty({ message: 'E-mail is required' })
  @IsEmail()
  private _email: string;

  private _paste: PasteEntity[];

  public constructor(props: UserProps) {
    this._id = props.id ?? randomUUID();
    this._username = props.username;
    this._password = props.password;
    this._email = props.email;
    this._paste = props.paste ?? [];
  }

  public get id(): string {
    return this._id;
  }

  public set id(value: string) {
    this._id = value;
  }

  public get username(): string {
    return this._username;
  }

  public set username(value: string) {
    this._username = value;
  }

  public get password(): string {
    return this._password;
  }

  public set password(value: string) {
    this._password = value;
  }

  public get email(): string {
    return this._email;
  }

  public set email(value: string) {
    this._email = value;
  }

  public get paste(): PasteEntity[] {
    return this._paste;
  }

  public set paste(value: PasteEntity[]) {
    this._paste = value;
  }
}
