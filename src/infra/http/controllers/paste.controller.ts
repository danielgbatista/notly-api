import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { PasteEntity } from '../../../domain/entities/paste.entity';
import PastePresenter from '../presenter/paste-presenter';
import PasteUpdateRequestBody from '../request-body/paste/paste-update-request-body';
import CreatePasteUseCase from '@application/use-cases/paste/create-paste-use-case';
import DeletePasteUseCase from '@application/use-cases/paste/delete-paste-use-case';
import GetPasteByIdUseCase from '@application/use-cases/paste/get-by-id-paste-use-case';
import ListAllPasteUseCase from '@application/use-cases/paste/list-all-paste-use-case';
import UpdatePasteUseCase from '@application/use-cases/paste/update-paste-use-case';

@Controller('user/:userId/paste')
export class PasteController {
  constructor(
    private readonly _createPasteUseCase: CreatePasteUseCase,
    private readonly _updatePasteUseCase: UpdatePasteUseCase,
    private readonly _listAllPastesUseCase: ListAllPasteUseCase,
    private readonly _getPasteByIdUseCase: GetPasteByIdUseCase,
    private readonly _deletePasteUseCase: DeletePasteUseCase
  ) {}

  @Post()
  async create(@Param('userId') userId: string, @Body() data: PasteEntity) {
    const paste = await this._createPasteUseCase.handle(userId, data);
    return PastePresenter.toHttpResponse(paste)
  }

  @Get()
  async findAll() {
    const pastes = await this._listAllPastesUseCase.handle()
    return PastePresenter.toHttpListResponse(pastes)
  }

  @Get('/:pasteId')
  async findById(
    @Param('userId') userId: string,
    @Param('pasteId') pasteId: string
  ) {
    const paste = await this._getPasteByIdUseCase.handle(pasteId)
    return PastePresenter.toHttpResponse(paste)
  }

  @Put('/:pasteId')
  async update(
    @Param('userId') userId: string,
    @Param('pasteId') pasteId: string,
    @Body() body: PasteUpdateRequestBody
  ) {
    const paste = await this._updatePasteUseCase.handle(pasteId, body)
    return PastePresenter.toHttpResponse(paste)
  }

  @Delete('/:pasteId')
  async delete(
    @Param('userId') userId: string,
    @Param('pasteId') pasteId: string
  ) {
    const paste = await this._deletePasteUseCase.handle(pasteId)
    return paste
  }
}
