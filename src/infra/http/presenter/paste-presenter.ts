import type NoteEntity from '@domain/entities/note.entity';
import type PasteEntity from '@domain/entities/paste.entity';

export interface PasteWithUserAndNotesCustomResponse {
  id: string | undefined;
  title: string | undefined;
  createdAt: Date | undefined;
  updateAt: Date | undefined;
  author: {
    id: string | undefined;
    name: string | undefined;
  };
  notes: NoteEntity[] | undefined;
}

export interface PasteCustomResponse {
  id: string;
  title: string;
  createdAt: Date;
  updateAt: Date;
}

export interface PastesCustomResponse {
  amount: number;
  data: PasteCustomResponse[];
}
export default class PastePresenter {
  public toHttpResponseWithRelationUserAndNotes(
    paste: PasteEntity | null
  ): PasteWithUserAndNotesCustomResponse {
    return {
      author: {
        id: paste?.userId,
        name: paste?.user?.username
      },
      createdAt: paste?.createdAt,
      id: paste?.id,
      notes: paste?.note,
      title: paste?.title,
      updateAt: paste?.updatedAt
    };
  }

  public toHttpResponse(paste: PasteEntity): PasteCustomResponse {
    return {
      createdAt: paste.createdAt,
      id: paste.id,
      title: paste.title,
      updateAt: paste.updatedAt
    };
  }

  public toHttpListResponse(pastes: PasteEntity[]): PastesCustomResponse {
    return {
      amount: pastes.length,
      data: pastes.map((paste) => this.toHttpResponse(paste))
    };
  }
}
