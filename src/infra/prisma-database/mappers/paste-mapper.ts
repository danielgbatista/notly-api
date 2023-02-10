import { PasteEntity } from '@domain/entities/paste.entity';
import { Injectable } from '@nestjs/common';
import UserMapper from './user-mapper';
import { Note, Paste, User } from '@prisma/client';
import { UserEntity } from '@domain/entities/user.entity';
import { NoteEntity } from '@domain/entities/note.entity';

@Injectable()
export default class PasteMapper {

    public toModel(paste: PasteEntity): Paste {
        const model = paste

        model.id = paste.id
        model.title = paste.title
        model.userId = paste.userId
        model.createdAt = paste.createdAt
        model.updatedAt = paste.updatedAt
        model.user = paste.user
        model.note = paste.note

        return model
    }

    public toEntity(paste: Paste, notes: Note[], user: User): PasteEntity {
        const entity = new PasteEntity({
            id: paste.id,
            title: paste.title,
            userId: paste.userId,
            createdAt: new Date(paste.createdAt),
            updatedAt: new Date(paste.updatedAt),
            note: notes.map(note => new NoteEntity(note)),
            user: new UserEntity(user)
        })

        return entity
    }

    public toModelList(pastes: PasteEntity[]): Paste[] {
        return pastes.map(this.toModel)
    }

    public toEntityList(pastes: Paste[], notes: Note[], user: User): PasteEntity[] {
        return pastes.map(paste => this.toEntity(paste, notes, user))
    }
}