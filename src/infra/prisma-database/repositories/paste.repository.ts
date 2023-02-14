import { PrismaService } from '@infra/prisma-database/prisma.service';
import { Injectable } from '@nestjs/common';
import { PasteEntity } from '@domain/entities/paste.entity';
import PasteRepository from '@application/repositories/paste-repository';
import PasteMapper from '../mappers/paste-mapper';

@Injectable()
export class PastePrismaRepository implements PasteRepository {
  constructor(
    private readonly _database: PrismaService,
    private readonly _mapper: PasteMapper
  ) {}

  async create(id: string, paste: PasteEntity): Promise<PasteEntity> {
    const data = await this._database.paste.create({
      data: this._mapper.toModel(paste),
      include: {
        user: true,
        note: true,
      },
    });
    return this._mapper.toEntity(data, data.note, data.user)
  }

  async listAll(): Promise<PasteEntity[]> {
    const data = await this._database.paste.findMany({
      include: {
        user: true,
        note: true,
      },
    });
    return data
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
    return this._mapper.toEntity(data, data.note, data.user);
  }

  async update(paste: PasteEntity, id: string): Promise<PasteEntity> {
    const data = await this._database.paste.update({
      data: this._mapper.toModel(paste),
      where: {
        id,
      },
      include: {
        user: true,
        note: true,
      },
    });
    return this._mapper.toEntity(data, data.note, data.user);
  }

  async delete(id: string): Promise<PasteEntity> {
    return await this._database.paste.delete({
      where: {
        id,
      },
    });
  }
}
