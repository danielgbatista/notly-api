import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import UserPresenter from '../presenter/user-presenter';
import { AuthService } from '../services/auth.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { Public } from '@infra/http/decorators/public.decorator';
import UserCreateRequestBody from '../request-body/user/user-create-request-body';
import UserUpdateRequestBody from '../request-body/user/user-update-request-body';
import CreateUserUseCase  from '@application/use-cases/user/create-user-use-case';
import ListAllUserUseCase from '@application/use-cases/user/list-all-user-use-case';
import GetUserByIdUseCase from '@application/use-cases/user/get-one-user-use-case';
import UpdateUserUseCase from '@application/use-cases/user/update-user-use-case';
import DeleteUserUseCase from '@application/use-cases/user/delete-user-use-case';

@Controller('user')
export class UserController {
  constructor(
    private readonly _createUserUseCase: CreateUserUseCase,
    private readonly _listAllUsersUseCase: ListAllUserUseCase,
    private readonly _getUserByIdUseCase: GetUserByIdUseCase,
    private readonly _updateUserUseCase: UpdateUserUseCase,
    private readonly _deleteUserUseCase: DeleteUserUseCase,
    private readonly _authService: AuthService
    )
  {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this._authService.login(req.user)
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user
  }

  @Public()
  @Post('/')
  async create(@Body() body: UserCreateRequestBody) {
    const user = await this._createUserUseCase.handle(body);
    return UserPresenter.toHttpResponse(user)
  }

  @Get('/')
  async listAll() {
    const users = await this._listAllUsersUseCase.handle();
    return UserPresenter.toHttpListResponse(users)
  }

  @Get('/:userId')
  async listOne(@Param('userId') userId: string) {
    const user = await this._getUserByIdUseCase.handle(userId)
    return UserPresenter.toHttpResponse(user);
  }

  @Put('/:userId')
  async update(@Param('userId') userId: string, @Body() body: UserUpdateRequestBody) {
    const user = await this._updateUserUseCase.handle(userId, body);
    return UserPresenter.toHttpResponse(user);
  }

  @Delete('/:userId')
  async delete(@Param('userId') userId: string) {
    const user = await this._deleteUserUseCase.handle(userId);
    return user
  }
}
