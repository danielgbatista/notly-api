export type UserProps = {
  id?: string;
  username: string;
  password?: string;
  email: string;
}

export class UserEntity {
  id: string;
  username: string;
  password: string;
  email: string;

  constructor(props: UserProps) {
    this.id = props.id;
    this.username = props.username;
    this.password = props.password;
    this.email = props.email;
  }
}
