import { UserEntity } from "@domain/entities/user.entity";

export default class UserPresenter {

    static toHttpResponse(user: UserEntity) {
        return {
            id: user.id,
            username: user.username,
            email: user.email
        }
    }

    static toHttpListResponse(users: UserEntity[]) {    
        return {
            amount: users.length,
            data: users.map(this.toHttpResponse)
        }
    }
}