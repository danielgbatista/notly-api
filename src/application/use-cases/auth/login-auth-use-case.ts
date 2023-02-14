
import { UserEntity } from "@domain/entities/user.entity";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export default class loginAuthUseCase {
    constructor( 
       private readonly _jwtService: JwtService 
    ) {}

    public async handle(user: UserEntity) {
        const payload = { username: user.email, sub: user.id };
        return {
            access_token: this._jwtService.sign(payload)
        }
    }
}