import type UserEntity from '@domain/entities/user.entity';

export interface UserWithPasteCustomResponse {
  id: string | undefined;
  username: string | undefined;
  email: string | undefined;
  folders:
    | Array<{
        createdAt: Date;
        id: string | undefined;
        title: string;
        updatedAt: Date | undefined;
      }>
    | undefined;
}

export interface UserCustomResponse {
  id: string;
  username: string;
  email: string;
}

export interface UsersCustomResponse {
  amount: number;
  data: UserCustomResponse[];
}
export default class UserPresenter {
  public toHttpResponseWithRelationPaste(user: UserEntity | null): UserWithPasteCustomResponse {
    return {
      email: user?.email,
      folders: user?.paste.map((paste) => ({
        createdAt: paste.createdAt,
        id: paste.id,
        title: paste.title,
        updatedAt: paste.updatedAt
      })),
      id: user?.id,
      username: user?.username
    };
  }

  public toHttpResponse(user: UserEntity): UserCustomResponse {
    return {
      email: user.email,
      id: user.id,
      username: user.username
    };
  }

  public toHttpListResponse(users: UserEntity[]): UsersCustomResponse {
    return {
      amount: users.length,
      data: users.map((user) => this.toHttpResponse(user))
    };
  }
}
