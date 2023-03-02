/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable unused-imports/no-unused-vars */
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import CreateNoteUseCase from '@application/use-cases/note/create-note-use-case';
import DeleteNoteUseCase from '@application/use-cases/note/delete-note-use-case';
import GetNoteByIdUseCase from '@application/use-cases/note/get-by-id-note-use-case';
import ListAllNotesUseCase from '@application/use-cases/note/list-all-note-use-case';
import NoteCreateRequestBody from '@infra/http/request-body/note/note-create-request-body';
import NotePresenter from '@infra/http/presenter/note-presenter';
import NoteUpdateRequestBody from '@infra/http/request-body/note/note-update-request-body';
import UpdateNoteUseCase from '@application/use-cases/note/update-note-use-case';
import type {
  NoteCustomResponse,
  NoteWithPasteCustomResponse,
  NotesCustomResponse
} from '@infra/http/presenter/note-presenter';

@Controller('/paste/:pasteId/note')
export class NoteController {
  private readonly _createNoteUseCase: CreateNoteUseCase;
  private readonly _updateNoteUseCase: UpdateNoteUseCase;
  private readonly _listAllNotesUseCase: ListAllNotesUseCase;
  private readonly _getNoteByIdUseCase: GetNoteByIdUseCase;
  private readonly _deleteNoteUseCase: DeleteNoteUseCase;

  // eslint-disable-next-line max-params
  public constructor(
    createNoteUseCase: CreateNoteUseCase,
    updateNoteUseCase: UpdateNoteUseCase,
    listAllNotesUseCase: ListAllNotesUseCase,
    getNoteByIdUseCase: GetNoteByIdUseCase,
    deleteNoteUseCase: DeleteNoteUseCase
  ) {
    this._createNoteUseCase = createNoteUseCase;
    this._updateNoteUseCase = updateNoteUseCase;
    this._listAllNotesUseCase = listAllNotesUseCase;
    this._deleteNoteUseCase = deleteNoteUseCase;
    this._getNoteByIdUseCase = getNoteByIdUseCase;
  }

  @Post()
  public async create(
    @Param('pasteId') pasteId: string,
    @Body() data: NoteCreateRequestBody
  ): Promise<NoteCustomResponse> {
    const note = await this._createNoteUseCase.handle(pasteId, data);

    return new NotePresenter().toHttpResponse(note);
  }

  @Get()
  public async listAll(): Promise<NotesCustomResponse> {
    const notes = await this._listAllNotesUseCase.handle();

    return new NotePresenter().toHttpListResponse(notes);
  }

  @Get('/:noteId')
  public async listOne(
    @Param('pasteId') pasteId: string,
    @Param('noteId') noteId: string
  ): Promise<NoteWithPasteCustomResponse | null> {
    const note = await this._getNoteByIdUseCase.handle(pasteId, noteId);

    return new NotePresenter().toHttpResponseWithRelationPaste(note);
  }

  @Put('/:noteId')
  public async update(
    @Param('pasteId') pasteId: string,
    @Param('noteId') noteId: string,
    @Body() data: NoteUpdateRequestBody
  ): Promise<NoteCustomResponse> {
    const note = await this._updateNoteUseCase.handle(pasteId, noteId, data);

    return new NotePresenter().toHttpResponse(note);
  }

  @Delete('/:noteId')
  public async delete(
    @Param('pasteId') pasteId: string,
    @Param('noteId') noteId: string
  ): Promise<NoteCustomResponse> {
    const note = await this._deleteNoteUseCase.handle(pasteId, noteId);

    return new NotePresenter().toHttpResponse(note);
  }
}
