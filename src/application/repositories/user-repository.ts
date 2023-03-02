import type UserEntity from '@domain/entities/user.entity';

export default abstract class UserRepository {
  public abstract create(user: UserEntity): Promise<UserEntity>;
  public abstract listAll(): Promise<UserEntity[]>;
  public abstract getById(id: string): Promise<UserEntity | null>;
  public abstract update(user: UserEntity, id: string): Promise<UserEntity>;
  public abstract delete(id: string): Promise<UserEntity>;
  public abstract getByEmail(email: string): Promise<UserEntity | null>;
}
