import { UserEntity } from "@domain/entities/user.entity";
import PastePresenter from "./paste-presenter";

export default class UserPresenter {

    static toHttpResponse(user: UserEntity) {
        return {
            id: user.id,
            username: user.username,
            email: user.email,
            folders: user?.paste.map((paste) => ({
                id: paste?.id,
                title: paste?.title,
                createdAt: paste?.createdAt,
                updatedAt: paste?.updatedAt,
            })
            )
        }
    }

    static toHttpListResponse(users: UserEntity[]) {
        return {
            amount: users.length,
            data: users.map(this.toHttpResponse)
        }
    }
}