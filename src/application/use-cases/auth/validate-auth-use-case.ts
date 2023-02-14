import UserRepository from '@application/repositories/user-repository';
import { AuthEntity } from '@domain/entities/auth.entity';
import { UserEntity } from '@domain/entities/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class ValidateAuthUseCase {
    constructor(
        private _userRepository: UserRepository
    ) {}

    public async handle(email: string, pass: string) {
        const userExist = await this._userRepository.getByEmail(email);
        
        if (!userExist && userExist.password !== pass) {
            return console.log('User does not exist');
        }
        
        const { password, ...result } = userExist;
        return result;
    }
}