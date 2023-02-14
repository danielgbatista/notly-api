import { PasteEntity } from "@domain/entities/paste.entity";

export default class PastePresenter {

    static toHttpResponse(paste: PasteEntity){
        return {
            id: paste.id,
            title: paste.title,
            createdAt: paste.createdAt,
            updateAt: paste.updatedAt,
            author:{ 
                id : paste.userId,
                name : paste.user?.username
            },
            notes: paste.note
        }
    }

    static toHttpListResponse(pastes: PasteEntity[]) {
        return {
            amount: pastes.length,
            data: pastes.map(this.toHttpResponse)
        }
    }
}