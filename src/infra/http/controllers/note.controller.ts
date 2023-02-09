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
import { NoteService } from '../services/note.service';

@Controller('/paste/:pasteId/note')
export class NoteController {
  constructor(private readonly _note_service: NoteService) {}

  // @Post()
  // async create(@Param('pasteId') pasteId: string, @Body() data: NoteEntity) {
  //   return await this._note_service.create(pasteId, data);
  // }

  // @Get()
  // async listAll() {
  //   return await this._note_service.findAll();
  // }

  // @Get('/:noteId')
  // async listOne(
  //   @Param('pasteId') pasteId: string,
  //   @Param('noteId') noteId: string
  // ) {
  //   return await this._note_service.findOne(pasteId, noteId);
  // }

  // @Put('/:noteId')
  // async update(
  //   @Param('pasteId') pasteId: string,
  //   @Param('noteId') noteId: string,
  //   @Body() data: NoteEntity
  // ) {
  //   return await this._note_service.update(pasteId, noteId, data);
  // }

  // @Delete('/:noteId')
  // async delete(
  //   @Param('pasteId') pasteId: string,
  //   @Param('noteId') noteId: string
  // ) {
  //   return await this._note_service.delete(pasteId, noteId);
  // }
}
