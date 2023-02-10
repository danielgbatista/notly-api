import { PasteEntity } from "./paste.entity";

export type UserProps = {
  id?: string;
  username: string;
  password?: string;
  email: string;
  paste?: PasteEntity[]
}

export class UserEntity {
  id: string;
  username: string;
  password: string;
  email: string;
  paste?: PasteEntity[];

  constructor(props: UserProps) {
    this.id = props.id;
    this.username = props.username;
    this.password = props.password;
    this.email = props.email;
    this.paste = props.paste;
  }
}
