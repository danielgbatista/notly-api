export type AuthProps = {
    email: string;
    password: string;
}

export class AuthEntity {
    email: string;
    password: string;

    constructor(props: AuthProps) {
        this.email = props.email;
        this.password = props.password;
    }
}