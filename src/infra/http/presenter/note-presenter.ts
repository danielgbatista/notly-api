import { NoteEntity } from "@domain/entities/note.entity"

export default class NotePresenter {

    static toHttpResponse(note: NoteEntity ) {
        return {
            id: note?.id,
            title: note.title,
            content: note.content,
            createdAt: note.createdAt,
            updatedAt: note.updatedAt,
            folder: {
                id: note.pasteId,
                title: note.paste?.title 
            },
        }
    }

    static toHttpListResponse(notes: NoteEntity[]) {
        return {
            amount: notes.length,
            data: notes.map(this.toHttpResponse)
        }
    }
}