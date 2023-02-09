import { UserEntity } from '@domain/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient, User } from '@prisma/client';


@Injectable()
export default class UserMapper {

    public toModel(user: UserEntity): User {
        const model = user

        model.id = user.id;
        model.username = user.username;
        model.email = user.email;
        model.password = user.password;

        return model
    }

    public toEntity(user: User): UserEntity {
        const entity = new UserEntity({
            id: user.id,
            username: user.username,
            email: user.email,
            password: user.password
        })

        return entity;
    }

    public toModelList(users: UserEntity[]) : User[] {
        return users.map(this.toModel)
    }

    public toEntityList(users: User[]) : UserEntity[] {
        return users.map(this.toEntity)
    }

}