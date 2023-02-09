import { PrismaModule } from '@infra/prisma-database/prisma.module';
import { Module } from '@nestjs/common';
import { NoteController } from '../controllers/note.controller';
import { NoteRepository } from '../../prisma-database/repositories/note.repository';
import { NoteService } from '../services/note.service';

@Module({
  imports: [PrismaModule],
  controllers: [NoteController],
  providers: [NoteService, NoteRepository],
})
export class NoteModule {}
