import { NoteEntity } from "@domain/entities/note.entity"
import { PasteEntity } from "@domain/entities/paste.entity"
import { Injectable } from "@nestjs/common"
import { Note, Paste } from "@prisma/client"

@Injectable()
export default class NoteMapper {
    public toModel(note: NoteEntity): Note {
        const model = note

        model.id = note.id
        model.title = note.title
        model.content = note.content
        model.pasteId = note.pasteId
        model.createdAt = note.createdAt
        model.updatedAt = note.updatedAt

        return model
    }

    public toEntity(note: Note, paste: Paste): NoteEntity {
        const entity = new NoteEntity({
            id: note.id,
            title: note.title,
            content: note.content,
            pasteId: note.pasteId,
            createdAt: new Date(note.createdAt),
            updatedAt: new Date(note.updatedAt),
            paste: new PasteEntity(paste), 
        })

        return entity
    }

    public toModelList(notes: NoteEntity[]): Note[] {
        return notes.map(this.toModel)
    }

    public toEntityList(notes: Note[], paste: Paste): NoteEntity[] {
        return notes.map(notes => this.toEntity(notes, paste))
    }
}