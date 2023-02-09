import UserRepository from '@application/repositories/user-repository';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// import { UserPrismaRepository } from '../../prisma-database/repositories/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private _user_repository: UserRepository,
    private _jwt_service: JwtService
    ) {}

  async validateUser(email: string, pass: string) {
    const userExist = await this._user_repository.getByEmail(email);
    if (userExist && userExist.password === pass) {
      const { password, ...result } = userExist;
      return result;
    }

    return console.log('User does not exist');
  }

  async login(user: any){
    const payload = { username: user.email, sub: user.id };
    return {
        access_token: this._jwt_service.sign(payload),
    }
  }
}
