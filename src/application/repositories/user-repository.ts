import { UserEntity } from "@domain/entities/user.entity";

export default abstract class UserRepository {
    abstract create(user: UserEntity) : Promise<UserEntity>;
    abstract listAll() : Promise<UserEntity[]>;
    abstract getById(id: string) : Promise<UserEntity | null>;
    abstract update(user: UserEntity, id: string) : Promise<UserEntity>;
    abstract delete(id: string) : Promise<boolean | UserEntity>;
    abstract getByEmail(email: string) : Promise<UserEntity>;
}