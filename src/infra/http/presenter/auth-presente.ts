import type { AuthEntity } from '@domain/entities/auth.entity';

export interface AuthCustomResponse {
  id: string;
  email: string;
}

export default class AuthPresenter {
  public toHttpResponse(user: AuthEntity): AuthCustomResponse {
    return {
      email: user.email,
      id: user.id
    };
  }
}
