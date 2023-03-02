import { Module } from '@nestjs/common';
import { NoteMapper } from './mappers/note-mapper';
import { NotePrismaRepository } from '@infra/prisma-database/repositories/note.repository';
import { PasteMapper } from './mappers/paste-mapper';
import { PastePrismaRepository } from '@infra/prisma-database/repositories/paste.repository';
import { PrismaService } from '@infra/prisma-database/prisma.service';
import { UserMapper } from './mappers/user-mapper';
import { UserPrismaRepository } from '@infra/prisma-database/repositories/user.repository';
import NoteRepository from '@application/repositories/note-repository';
import PasteRepository from '@application/repositories/paste-repository';
import UserRepository from '@application/repositories/user-repository';

@Module({
  exports: [PrismaService, UserRepository, PasteRepository, NoteRepository],
  imports: [],
  providers: [
    PrismaService,
    UserMapper,
    {
      provide: UserRepository,
      useClass: UserPrismaRepository
    },
    PasteMapper,
    {
      provide: PasteRepository,
      useClass: PastePrismaRepository
    },
    NoteMapper,
    {
      provide: NoteRepository,
      useClass: NotePrismaRepository
    }
  ]
})
export class PrismaModule {}
