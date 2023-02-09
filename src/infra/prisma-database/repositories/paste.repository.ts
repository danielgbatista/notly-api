import { PrismaService } from '@infra/prisma-database/prisma.service';
import { Injectable } from '@nestjs/common';
import { PasteEntity } from '@domain/entities/paste.entity';
import PasteRepository from '@application/repositories/paste-repository';
import PasteMapper from '../mappers/paste-mapper';
import UserCreateRequestBody from '@infra/http/request-body/user/user-create-request-body';

@Injectable()
export class PastePrismaRepository implements PasteRepository {
  constructor(
    private readonly _database: PrismaService,
    private readonly _mapper: PasteMapper
  ) {}

  async create(id: string, paste: PasteEntity): Promise<PasteEntity> {
    console.log('folder: ', paste)
    const data = await this._database.paste.create({
      data: {
        ...paste,
        userId: id,
      },
      include: {
        user: true,
        note: true,
      },
    });

    return this._mapper.toModel(data)
  }

  async listAll(): Promise<PasteEntity[]> {
    const data = await this._database.paste.findMany();
    return this._mapper.toModelList(data)
  }

  async getById(id: string): Promise<PasteEntity> {
    const data = await this._database.paste.findFirst({
      where: {
        id,
      },
      include: {
        user: true,
        note: true,
      },
    });
    return this._mapper.toModel(data)
  }

  async update(paste: PasteEntity, id: string): Promise<PasteEntity> {
    const data = await this._database.paste.update({
      data: paste,
      where: {
        id,
      },
    });
    return this._mapper.toModel(data)
  }

  async delete(id: string): Promise<boolean | PasteEntity> {
    const data = await this._database.paste.delete({
      where: {
        id,
      },
    });
    return this._mapper.toModel(data)
  }
}
