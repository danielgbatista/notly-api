import UserRepository from '@application/repositories/user-repository'
import { UserEntity } from '@domain/entities/user.entity'
import { Injectable } from '@nestjs/common'

type UserCreateInput = {
    username: string
    email: string
    password?: string
}

@Injectable()
export default class CreateUserUseCase {
    constructor(
        private readonly _user_repository: UserRepository
    ) {}

    public async handle(input: UserCreateInput): Promise<UserEntity> {
        const user = new UserEntity(input);

        await this._user_repository.create(user);

        return user;
    }
} 