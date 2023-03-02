import { Injectable } from '@nestjs/common';
import { NoteMapper } from '@infra/prisma-database/mappers/note-mapper';
import { PrismaService } from '@infra/prisma-database/prisma.service';
import type NoteEntity from '@domain/entities/note.entity';
import type NoteRepository from '@application/repositories/note-repository';

@Injectable()
export class NotePrismaRepository implements NoteRepository {
  private readonly _database: PrismaService;
  private readonly _mapper: NoteMapper;

  public constructor(database: PrismaService, mapper: NoteMapper) {
    this._database = database;
    this._mapper = mapper;
  }

  public async create(id: string, note: NoteEntity): Promise<NoteEntity> {
    const data = await this._database.note.create({
      data: this._mapper.toModel(note)
    });

    return this._mapper.toEntity(data);
  }

  public async listAll(): Promise<NoteEntity[]> {
    const data = await this._database.note.findMany();

    return this._mapper.toEntityList(data);
  }

  public async getById(id: string): Promise<NoteEntity | null> {
    const data = await this._database.note.findFirst({
      include: {
        paste: true
      },
      where: {
        id
      }
    });

    if (data === null) return null;

    return this._mapper.toEntityWithPaste(data, data.paste);
  }

  public async update(note: NoteEntity, id: string): Promise<NoteEntity> {
    const data = await this._database.note.update({
      data: this._mapper.toModel(note),
      where: {
        id
      }
    });

    return this._mapper.toEntity(data);
  }

  public async delete(id: string): Promise<NoteEntity> {
    const data = await this._database.note.delete({
      where: { id }
    });

    return this._mapper.toEntity(data);
  }
}
