export interface AuthProps {
  id: string;
  email: string;
}

export class AuthEntity {
  private _id: string;
  private _email: string;

  public constructor(props: AuthProps) {
    this._id = props.id;
    this._email = props.email;
  }

  public get id(): string {
    return this._id;
  }

  public set id(id: string) {
    this._id = id;
  }

  public get email(): string {
    return this._email;
  }

  public set email(email: string) {
    this._email = email;
  }
}
