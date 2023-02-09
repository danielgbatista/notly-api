import CreatePasteUseCase from '@application/use-cases/paste/create-paste-use-case';
import DeletePasteUseCase from '@application/use-cases/paste/delete-paste-use-case';
import GetPasteByIdUseCase from '@application/use-cases/paste/get-by-id-paste-use-case';
import ListAllPasteUseCase from '@application/use-cases/paste/list-all-paste-use-case';
import UpdatePasteUseCase from '@application/use-cases/paste/update-paste-use-case';
import { PrismaModule } from '@infra/prisma-database/prisma.module';
import { Module } from '@nestjs/common';
import { PasteController } from '../controllers/paste.controller';

@Module({
  imports: [PrismaModule],
  controllers: [PasteController],
  providers: [
    CreatePasteUseCase,
    ListAllPasteUseCase,
    DeletePasteUseCase,
    GetPasteByIdUseCase,
    UpdatePasteUseCase
  ],
})
export class PasteModule {}
