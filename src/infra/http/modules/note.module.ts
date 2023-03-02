import { Module } from '@nestjs/common';
import { NoteController } from '@infra/http/controllers/note.controller';
import { PrismaModule } from '@infra/prisma-database/prisma.module';
import CreateNoteUseCase from '@application/use-cases/note/create-note-use-case';
import DeleteNoteUseCase from '@application/use-cases/note/delete-note-use-case';
import GetNoteByIdUseCase from '@application/use-cases/note/get-by-id-note-use-case';
import ListAllNotesUseCase from '@application/use-cases/note/list-all-note-use-case';
import UpdateNoteUseCase from '@application/use-cases/note/update-note-use-case';

@Module({
  controllers: [NoteController],
  imports: [PrismaModule],
  providers: [
    CreateNoteUseCase,
    UpdateNoteUseCase,
    ListAllNotesUseCase,
    GetNoteByIdUseCase,
    DeleteNoteUseCase
  ]
})
export class NoteModule {}
