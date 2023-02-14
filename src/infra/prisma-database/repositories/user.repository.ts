import { Injectable } from '@nestjs/common';
import { PrismaService } from '@infra/prisma-database/prisma.service';
import { UserEntity } from '@domain/entities/user.entity';
import UserRepository from '@application/repositories/user-repository';
import UserMapper from '../mappers/user-mapper';

@Injectable()
export class UserPrismaRepository implements UserRepository {
  constructor(
    private readonly _database: PrismaService,
    private readonly _mapper: UserMapper 
  ) {}

  async create(user: UserEntity): Promise<any> {
    const data = await this._database.user.create({
      data: this._mapper.toModel(user),
      include: {
        paste: true
      }
    });
    return this._mapper.toEntity(data, data.paste)
  }
  
  async listAll(): Promise<UserEntity[]> {
    return await this._database.user.findMany({
      include:{
        paste: true
      }
    });
  }

  async getById(id: string): Promise<UserEntity> {
    const data = await this._database.user.findFirst({
      where: {
        id,
      },
      include: {
        paste: true,
      },
    });
    return this._mapper.toEntity(data, data.paste)
  }

  async update(user: UserEntity, id: string): Promise<UserEntity> {
    const data = await this._database.user.update({
      data: this._mapper.toModel(user),
      where: {
        id,
      },
      include: {
        paste: true
      }
    });
    return this._mapper.toEntity(data, data.paste)
  }

  async delete(id: string): Promise<UserEntity> {
    return await this._database.user.delete({
      where: {
        id,
      },
    });
  }

  async getByEmail(email: string): Promise<UserEntity> {
    const data = await this._database.user.findUnique({ where: { email }, include: { paste: true } });
    return this._mapper.toEntity(data, data.paste)
  }
}
