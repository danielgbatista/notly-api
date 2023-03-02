/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable unused-imports/no-unused-vars */
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import CreatePasteUseCase from '@application/use-cases/paste/create-paste-use-case';
import DeletePasteUseCase from '@application/use-cases/paste/delete-paste-use-case';
import GetPasteByIdUseCase from '@application/use-cases/paste/get-by-id-paste-use-case';
import ListAllPasteUseCase from '@application/use-cases/paste/list-all-paste-use-case';
import PasteCreateRequestBody from '@infra/http/request-body/paste/paste-create-request-body';
import PastePresenter from '@infra/http/presenter/paste-presenter';
import PasteUpdateRequestBody from '@infra/http/request-body/paste/paste-update-request-body';
import UpdatePasteUseCase from '@application/use-cases/paste/update-paste-use-case';
import type {
  PasteCustomResponse,
  PasteWithUserAndNotesCustomResponse,
  PastesCustomResponse
} from '@infra/http/presenter/paste-presenter';

@Controller('user/:userId/paste')
export class PasteController {
  private readonly _createPasteUseCase: CreatePasteUseCase;
  private readonly _updatePasteUseCase: UpdatePasteUseCase;
  private readonly _listAllPastesUseCase: ListAllPasteUseCase;
  private readonly _getPasteByIdUseCase: GetPasteByIdUseCase;
  private readonly _deletePasteUseCase: DeletePasteUseCase;

  // eslint-disable-next-line max-params
  public constructor(
    createPasteUseCase: CreatePasteUseCase,
    updatePasteUseCase: UpdatePasteUseCase,
    listAllPastesUseCase: ListAllPasteUseCase,
    getPasteByIdUseCase: GetPasteByIdUseCase,
    deletePasteUseCase: DeletePasteUseCase
  ) {
    this._createPasteUseCase = createPasteUseCase;
    this._getPasteByIdUseCase = getPasteByIdUseCase;
    this._deletePasteUseCase = deletePasteUseCase;
    this._listAllPastesUseCase = listAllPastesUseCase;
    this._updatePasteUseCase = updatePasteUseCase;
  }

  @Post()
  public async create(
    @Param('userId') userId: string,
    @Body() data: PasteCreateRequestBody
  ): Promise<PasteCustomResponse> {
    const paste = await this._createPasteUseCase.handle(userId, data);

    return new PastePresenter().toHttpResponse(paste);
  }

  @Get()
  public async findAll(): Promise<PastesCustomResponse> {
    const pastes = await this._listAllPastesUseCase.handle();

    return new PastePresenter().toHttpListResponse(pastes);
  }

  @Get('/:pasteId')
  public async findById(
    @Param('userId') userId: string,
    @Param('pasteId') pasteId: string
  ): Promise<PasteWithUserAndNotesCustomResponse | null> {
    const paste = await this._getPasteByIdUseCase.handle(userId, pasteId);

    return new PastePresenter().toHttpResponseWithRelationUserAndNotes(paste);
  }

  @Put('/:pasteId')
  public async update(
    @Param('userId') userId: string,
    @Param('pasteId') pasteId: string,
    @Body() body: PasteUpdateRequestBody
  ): Promise<PasteCustomResponse> {
    const paste = await this._updatePasteUseCase.handle(userId, pasteId, body);

    return new PastePresenter().toHttpResponse(paste);
  }

  @Delete('/:pasteId')
  public async delete(
    @Param('userId') userId: string,
    @Param('pasteId') pasteId: string
  ): Promise<PasteCustomResponse> {
    const paste = await this._deletePasteUseCase.handle(userId, pasteId);

    return new PastePresenter().toHttpResponse(paste);
  }
}
