import UserRepository from '@application/repositories/user-repository';
import { UserEntity } from '@domain/entities/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class DeleteUserUseCase {
    constructor(
        private readonly _user_repository: UserRepository
    ) {}

    public async handle(id: string): Promise<UserEntity> {
        return await this._user_repository.delete(id)
    }
}