import { Injectable } from '@nestjs/common';
import UserRepository from "@application/repositories/user-repository";
import { UserEntity } from '@domain/entities/user.entity';

type UserUpdateInput = {
    username: string
    email: string
    password: string
}

@Injectable()
export default class UpdateUserUseCase {
    constructor(
        private readonly _user_repository: UserRepository
    ) {}

    public async handle(id: string, input: UserUpdateInput): Promise<UserEntity> {
        const user = new UserEntity(input)
        
        await this._user_repository.update(user, id)

        return user
    }
} 