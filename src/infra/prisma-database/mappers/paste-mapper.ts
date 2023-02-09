import { PasteEntity } from '@domain/entities/paste.entity';
import { Injectable } from '@nestjs/common';
import { Paste } from '@prisma/client';

@Injectable()
export default class PasteMapper {
    public toModel(paste: PasteEntity): Paste {
        const model = paste

        model.id = paste.id
        model.title = paste.title
        model.userId = paste.userId
        model.createdAt = paste.createdAt
        model.updatedAt = paste.updatedAt

        return model
    }

    public toEntity(paste: Paste): PasteEntity {
        const entity = new PasteEntity({
            id: paste.id,
            title: paste.title,
            userId: paste.userId,
            createdAt: new Date(paste.createdAt),
            updatedAt: new Date(paste.updatedAt),
        })

        return entity
    }

    public toModelList(pastes: PasteEntity[]): Paste[] {
        return pastes.map(this.toModel)
    }

    public toEntityList(pastes: Paste[]): PasteEntity[] {
        return pastes.map(this.toEntity)
    }
}