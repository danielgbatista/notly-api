import CreateNoteUseCase from '@application/use-cases/note/create-note-use-case';
import DeleteNoteUseCase from '@application/use-cases/note/delete-note-use-case';
import GetNoteByIdUseCase from '@application/use-cases/note/get-by-id-note-use-case';
import ListAllNotesUseCase from '@application/use-cases/note/list-all-note-use-case';
import UpdateNoteUseCase from '@application/use-cases/note/update-note-use-case';
import {
  Controller,
  Post,
  Get,
  Delete,
  Put,
  Param,
  Body,
} from '@nestjs/common';
import { NoteEntity } from '../../../domain/entities/note.entity';
import NotePresenter from '../presenter/note-presenter';
import NoteCreateRequestBody from '../request-body/note/note-create-request-body';

@Controller('/paste/:pasteId/note')
export class NoteController {
  constructor(
    private readonly _createNoteUseCase: CreateNoteUseCase,
    private readonly _updateNoteUseCase: UpdateNoteUseCase,
    private readonly _listAllNotesUseCase: ListAllNotesUseCase,
    private readonly _getNoteByIdUseCase: GetNoteByIdUseCase,
    private readonly _deleteNoteUseCase: DeleteNoteUseCase,
 ) {}

  @Post()
  async create(@Param('pasteId') pasteId: string, @Body() data: NoteCreateRequestBody) {
    const note = await this._createNoteUseCase.handle(pasteId, data);
    return NotePresenter.toHttpResponse(note)
  }

  @Get()
  async listAll() {
    const notes = await this._listAllNotesUseCase.handle();
    return NotePresenter.toHttpListResponse(notes)
  }

  @Get('/:noteId')
  async listOne(
    @Param('pasteId') pasteId: string,
    @Param('noteId') noteId: string
  ) {
    const note = await this._getNoteByIdUseCase.handle(pasteId, noteId)
    return NotePresenter.toHttpResponse(note)
  }

  @Put('/:noteId')
  async update(
    @Param('pasteId') pasteId: string,
    @Param('noteId') noteId: string,
    @Body() data: NoteEntity
  ) {
    const note = await this._updateNoteUseCase.handle(pasteId, noteId, data)
    return NotePresenter.toHttpResponse(note)
  }

  @Delete('/:noteId')
  async delete(
    @Param('pasteId') pasteId: string,
    @Param('noteId') noteId: string
  ) {
    const note = await this._deleteNoteUseCase.handle(pasteId, noteId)
    return NotePresenter.toHttpResponse(note)
  }
}
