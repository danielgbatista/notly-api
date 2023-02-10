import { PasteEntity } from '@domain/entities/paste.entity';
import { UserEntity } from '@domain/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { Paste, Prisma, PrismaClient, User } from '@prisma/client';


@Injectable()
export default class UserMapper {

    public toModel(user: UserEntity): User {
        const model = user

        model.id = user.id;
        model.username = user.username;
        model.email = user.email;
        model.password = user.password;
        model.paste = user.paste;

        return model
    }

    public toEntity(user: User, paste: Paste[]): UserEntity {
        const entity = new UserEntity({
            id: user.id,
            username: user.username,
            email: user.email,
            password: user.password,
            paste: paste.map(paste => new PasteEntity(paste))
        })

        return entity;
    }

    public toModelList(users: UserEntity[]) : User[] {
        return users.map(this.toModel)
    }

    public toEntityList(users: User[], pastes: Paste[]) : UserEntity[] {
        return users.map(users => this.toEntity(users, pastes))
    }

}