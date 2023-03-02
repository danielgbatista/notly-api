import type UserEntity from '@domain/entities/user.entity';

export default class PasteCreateRequestBody {
  public title: string;
  public userId: string;
  public user: UserEntity;
}
