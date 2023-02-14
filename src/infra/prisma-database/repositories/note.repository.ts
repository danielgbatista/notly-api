import { PrismaService } from '@infra/prisma-database/prisma.service';
import { Injectable } from '@nestjs/common';
import { NoteEntity } from '@domain/entities/note.entity';
import NoteMapper from '../mappers/note-mapper';
import NoteRepository from '@application/repositories/note-repository';

@Injectable()
export class NotePrismaRepository implements NoteRepository{
  constructor(
    private readonly _database: PrismaService,
    private readonly _mapper: NoteMapper
  ) {}
  async create(id: string, note: NoteEntity): Promise<NoteEntity> {
    const data = await this._database.note.create({
      data: this._mapper.toModel(note),
      include: {
        paste: true,
      },
    });
    return this._mapper.toEntity(data, data?.paste);
  }

  async listAll(): Promise<NoteEntity[]> {
    return await this._database.note.findMany({
      include: {
        paste: true,
      }
    });
  }

  async getById(id: string): Promise<NoteEntity> {
    const data = await this._database.note.findFirst({
      where: {
        id,
      },
      include: {
        paste: true,
      },
    });

    return this._mapper.toEntity(data, data.paste)
  }

  async update(note: NoteEntity, id: string): Promise<NoteEntity> {
    const data = await this._database.note.update({
      data: this._mapper.toModel(note),
      where: {
        id,
      },
      include: {
        paste: true
      }
    });

    return this._mapper.toEntity(data, data.paste)
  }

  async delete(id: string): Promise<NoteEntity> {
    return await this._database.note.delete({
      where: {
        id,
      },
    });
  }
}
