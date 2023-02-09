import UserRepository from '@application/repositories/user-repository'
import { UserEntity } from '@domain/entities/user.entity'
import { Injectable } from '@nestjs/common'

@Injectable()
export default class GetUserByEmailUseCase {
    constructor(
        private readonly _user_repository: UserRepository
    ) {}

    public async handle(email: string) : Promise<UserEntity> {
        return await this._user_repository.getByEmail(email);
    }
} 