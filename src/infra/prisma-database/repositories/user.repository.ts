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

  async create(user: UserEntity): Promise<UserEntity> {
    const data = await this._database.user.create({
      data: {
        ...user,
      }
    });
    return this._mapper.toModel(data)
  }
  
  async listAll(): Promise<UserEntity[]> {
    const data = await this._database.user.findMany();
    return this._mapper.toModelList(data)
  }

  async getById(id: string): Promise<UserEntity> {
    return await this._database.user.findFirst({
      where: {
        id,
      },
      include: {
        paste: true,
      },
    });
  }

  async update(user: UserEntity, id: string): Promise<UserEntity> {
    return await this._database.user.update({
      data: user,
      where: {
        id,
      },
    });
  }

  async delete(id: string): Promise<boolean | UserEntity> {
    return await this._database.user.delete({
      where: {
        id,
      },
    });
  }

  async getByEmail(email: string) {
    return await this._database.user.findFirst({
      where: {
        email,
      },
    });
  }

  async verifyUserExistById(id: string) {
    return await this._database.user.findUnique({
      where: {
        id,
      },
    });
  }
}
