import { Injectable } from '@nestjs/common';
import UserRepository from "@application/repositories/user-repository";
import { UserEntity } from "@domain/entities/user.entity";

@Injectable()
export default class ListAllUserUseCase {
    constructor(
        private readonly _user_repository: UserRepository 
    ) {}

    public async handle() : Promise<UserEntity[]> {
        return this._user_repository.listAll();
    }
}