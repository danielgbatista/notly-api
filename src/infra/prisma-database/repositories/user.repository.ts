import { Injectable } from '@nestjs/common';
import { PrismaService } from '@infra/prisma-database/prisma.service';
import { UserMapper } from '@infra/prisma-database/mappers/user-mapper';
import type UserEntity from '@domain/entities/user.entity';
import type UserRepository from '@application/repositories/user-repository';

@Injectable()
export class UserPrismaRepository implements UserRepository {
  private readonly _database: PrismaService;
  private readonly _mapper: UserMapper;

  public constructor(database: PrismaService, mapper: UserMapper) {
    this._database = database;
    this._mapper = mapper;
  }

  public async create(user: UserEntity): Promise<UserEntity> {
    const data = await this._database.user.create({
      data: this._mapper.toModel(user)
    });

    return this._mapper.toEntity(data);
  }

  public async listAll(): Promise<UserEntity[]> {
    const data = await this._database.user.findMany();

    return this._mapper.toEntityList(data);
  }

  public async getById(id: string): Promise<UserEntity | null> {
    const data = await this._database.user.findUnique({
      include: {
        paste: true
      },
      where: { id }
    });

    if (data === null) return null;

    return this._mapper.toEntityWithPaste(data, data.paste);
  }

  public async update(user: UserEntity, id: string): Promise<UserEntity> {
    const data = await this._database.user.update({
      data: this._mapper.toModel(user),
      where: { id }
    });

    return this._mapper.toEntity(data);
  }

  public async delete(id: string): Promise<UserEntity> {
    const data = await this._database.user.delete({
      where: { id }
    });

    return this._mapper.toEntity(data);
  }

  public async getByEmail(email: string): Promise<UserEntity | null> {
    const data = await this._database.user.findUnique({
      include: {
        paste: true
      },
      where: { email }
    });

    if (data === null) return null;

    return this._mapper.toEntity(data);
  }
}
