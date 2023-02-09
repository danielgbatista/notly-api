import { PasteEntity } from "@domain/entities/paste.entity";

export default class PastePresenter {

    static toHttpResponse(paste: PasteEntity){
        return {
            id: paste.id,
            title: paste.title,
            userId: paste.userId,
            createdAt: paste.createdAt,
            updateAt: paste.updatedAt
        }
    }

    static toHttpListResponse(pastes: PasteEntity[]) {
        return {
            amount: pastes.length,
            data: pastes.map(this.toHttpResponse)
        }
    }
}