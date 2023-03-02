import { Module } from '@nestjs/common';
import { PasteController } from '@infra/http/controllers/paste.controller';
import { PrismaModule } from '@infra/prisma-database/prisma.module';
import CreatePasteUseCase from '@application/use-cases/paste/create-paste-use-case';
import DeletePasteUseCase from '@application/use-cases/paste/delete-paste-use-case';
import GetPasteByIdUseCase from '@application/use-cases/paste/get-by-id-paste-use-case';
import ListAllPasteUseCase from '@application/use-cases/paste/list-all-paste-use-case';
import UpdatePasteUseCase from '@application/use-cases/paste/update-paste-use-case';

@Module({
  controllers: [PasteController],
  imports: [PrismaModule],
  providers: [
    CreatePasteUseCase,
    ListAllPasteUseCase,
    DeletePasteUseCase,
    GetPasteByIdUseCase,
    UpdatePasteUseCase
  ]
})
export class PasteModule {}
