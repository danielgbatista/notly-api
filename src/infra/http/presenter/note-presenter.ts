import type NoteEntity from '@domain/entities/note.entity';

export interface NoteWithPasteCustomResponse {
  content: string | undefined;
  createdAt: Date | undefined;
  folder: {
    id: string | undefined;
    title: string | undefined;
  };
  id: string | undefined;
  title: string | undefined;
  updatedAt: Date | undefined;
}
export interface NoteCustomResponse {
  content: string;
  createdAt: Date;
  id: string;
  title: string;
  updatedAt: Date;
}

export interface NotesCustomResponse {
  amount: number;
  data: NoteCustomResponse[];
}

export default class NotePresenter {
  public toHttpResponseWithRelationPaste(note: NoteEntity | null): NoteWithPasteCustomResponse {
    return {
      content: note?.content,
      createdAt: note?.createdAt,
      folder: {
        id: note?.pasteId,
        title: note?.paste?.title
      },
      id: note?.id,
      title: note?.title,
      updatedAt: note?.updatedAt
    };
  }

  public toHttpResponse(note: NoteEntity): NoteCustomResponse {
    return {
      content: note.content,
      createdAt: note.createdAt,
      id: note.id,
      title: note.title,
      updatedAt: note.updatedAt
    };
  }

  public toHttpListResponse(notes: NoteEntity[]): NotesCustomResponse {
    return {
      amount: notes.length,
      data: notes.map((note) => this.toHttpResponse(note))
    };
  }
}
