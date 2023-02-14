import { Module } from '@nestjs/common';
import { NotePrismaRepository } from './repositories/note.repository';
import { PastePrismaRepository} from './repositories/paste.repository';
import { UserPrismaRepository } from './repositories/user.repository';
import { PrismaService } from './prisma.service';
import UserMapper from './mappers/user-mapper';
import UserRepository from '@application/repositories/user-repository';
import PasteMapper from './mappers/paste-mapper';
import PasteRepository from '@application/repositories/paste-repository';
import NoteMapper from './mappers/note-mapper';
import NoteRepository from '@application/repositories/note-repository';

@Module({
  imports: [],
  providers: [
    PrismaService,
    UserMapper,
    {
      provide: UserRepository,
      useClass: UserPrismaRepository, 
    },
    PasteMapper,
    {
      provide: PasteRepository,
      useClass: PastePrismaRepository, 
    },
    NoteMapper,
    {
      provide: NoteRepository,
      useClass: NotePrismaRepository,
    },
  ],
  exports: [PrismaService, UserRepository, PasteRepository, NoteRepository],
})
export class PrismaModule {}