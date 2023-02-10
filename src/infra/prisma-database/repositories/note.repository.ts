import { PrismaService } from '@infra/prisma-database/prisma.service';
import { Injectable } from '@nestjs/common';
import { NoteEntity } from '@domain/entities/note.entity';

@Injectable()
export class NoteRepository {
  constructor(private readonly _database: PrismaService) {}

  // async createNote(id: string, data: NoteEntity): Promise<NoteEntity> {
  //   return await this._database.note.create({
  //     data: {
  //       ...data,
  //       pasteId: id,
  //     },
  //     include: {
  //       paste: true,
  //     },
  //   });
  // }

  // async updateNote(id: string, data: NoteEntity): Promise<NoteEntity> {
  //   return await this._database.note.update({
  //     data: {
  //       ...data,
  //     },
  //     where: {
  //       id,
  //     },
  //   });
  // }

  // async findAllNotes(): Promise<NoteEntity[]> {
  //   return await this._database.note.findMany();
  // }

  // async findNoteById(id: string): Promise<NoteEntity> {
  //   return await this._database.note.findFirst({
  //     where: {
  //       id,
  //     },
  //     include: {
  //       paste: true,
  //     },
  //   });
  // }

  // async deleteNoteById(id: string): Promise<boolean | NoteEntity> {
  //   return await this._database.note.delete({
  //     where: {
  //       id,
  //     },
  //   });
  // }

  // async verifyNoteExistByTitle(title: string): Promise<boolean | NoteEntity>{
  //   return await this._database.note.findFirst({
  //     where: {
  //       title,
  //     },
  //   });
  // }

  // async verifyNoteExistById(id: string): Promise<boolean | NoteEntity>{
  //   return await this._database.note.findUnique({
  //     where: {
  //       id,
  //     },
  //   });
  // }
}
