import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Public } from '@infra/http/decorators/public.decorator';
import CreateUserUseCase from '@application/use-cases/user/create-user-use-case';
import DeleteUserUseCase from '@application/use-cases/user/delete-user-use-case';
import GetUserByIdUseCase from '@application/use-cases/user/get-one-user-use-case';
import ListAllUserUseCase from '@application/use-cases/user/list-all-user-use-case';
import UpdateUserUseCase from '@application/use-cases/user/update-user-use-case';
import UserCreateRequestBody from '@infra/http/request-body/user/user-create-request-body';
import UserPresenter from '@infra/http/presenter/user-presenter';
import UserUpdateRequestBody from '@infra/http/request-body/user/user-update-request-body';
import type {
  UserCustomResponse,
  UserWithPasteCustomResponse,
  UsersCustomResponse
} from '@infra/http/presenter/user-presenter';

@Controller('user')
export class UserController {
  private readonly _createUserUseCase: CreateUserUseCase;
  private readonly _listAllUsersUseCase: ListAllUserUseCase;
  private readonly _getUserByIdUseCase: GetUserByIdUseCase;
  private readonly _updateUserUseCase: UpdateUserUseCase;
  private readonly _deleteUserUseCase: DeleteUserUseCase;

  // eslint-disable-next-line max-params
  public constructor(
    createUserUseCase: CreateUserUseCase,
    listAllUsersUseCase: ListAllUserUseCase,
    getUserByIdUseCase: GetUserByIdUseCase,
    updateUserUseCase: UpdateUserUseCase,
    deleteUserUseCase: DeleteUserUseCase
  ) {
    this._createUserUseCase = createUserUseCase;
    this._updateUserUseCase = updateUserUseCase;
    this._deleteUserUseCase = deleteUserUseCase;
    this._getUserByIdUseCase = getUserByIdUseCase;
    this._listAllUsersUseCase = listAllUsersUseCase;
  }

  @Public()
  @Post('/')
  public async create(@Body() body: UserCreateRequestBody): Promise<UserCustomResponse> {
    const user = await this._createUserUseCase.handle(body);

    return new UserPresenter().toHttpResponse(user);
  }

  @Get('/')
  public async listAll(): Promise<UsersCustomResponse> {
    const users = await this._listAllUsersUseCase.handle();

    return new UserPresenter().toHttpListResponse(users);
  }

  @Get('/:userId')
  public async listOne(
    @Param('userId') userId: string
  ): Promise<UserWithPasteCustomResponse | null> {
    const user = await this._getUserByIdUseCase.handle(userId);

    return new UserPresenter().toHttpResponseWithRelationPaste(user);
  }

  @Put('/:userId')
  public async update(
    @Param('userId') userId: string,
    @Body() body: UserUpdateRequestBody
  ): Promise<UserCustomResponse> {
    const user = await this._updateUserUseCase.handle(userId, body);

    return new UserPresenter().toHttpResponse(user);
  }

  @Delete('/:userId')
  public async delete(@Param('userId') userId: string): Promise<UserCustomResponse> {
    const user = await this._deleteUserUseCase.handle(userId);

    return new UserPresenter().toHttpResponse(user);
  }
}
