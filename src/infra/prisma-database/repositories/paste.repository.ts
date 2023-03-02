import { Injectable } from '@nestjs/common';
import { PasteMapper } from '@infra/prisma-database/mappers/paste-mapper';
import { PrismaService } from '@infra/prisma-database/prisma.service';
import type PasteEntity from '@domain/entities/paste.entity';
import type PasteRepository from '@application/repositories/paste-repository';

@Injectable()
export class PastePrismaRepository implements PasteRepository {
  private readonly _database: PrismaService;
  private readonly _mapper: PasteMapper;

  public constructor(database: PrismaService, mapper: PasteMapper) {
    this._database = database;
    this._mapper = mapper;
  }

  public async create(id: string, paste: PasteEntity): Promise<PasteEntity> {
    const data = await this._database.paste.create({
      data: this._mapper.toModel(paste)
    });

    return this._mapper.toEntity(data);
  }

  public async listAll(): Promise<PasteEntity[]> {
    const data = await this._database.paste.findMany();

    return this._mapper.toEntityList(data);
  }

  public async getById(id: string): Promise<PasteEntity | null> {
    const data = await this._database.paste.findUnique({
      include: {
        note: true,
        user: true
      },
      where: { id }
    });

    if (data === null) return null;

    return this._mapper.toEntityWithUserAndNotes(data, data.note, data.user);
  }

  public async update(paste: PasteEntity, id: string): Promise<PasteEntity> {
    const data = await this._database.paste.update({
      data: this._mapper.toModel(paste),
      where: {
        id
      }
    });

    return this._mapper.toEntity(data);
  }

  public async delete(id: string): Promise<PasteEntity> {
    const data = await this._database.paste.delete({
      where: {
        id
      }
    });

    return this._mapper.toEntity(data);
  }
}
