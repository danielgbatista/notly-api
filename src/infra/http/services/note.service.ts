import { Injectable } from '@nestjs/common/decorators';

@Injectable()
export class NoteService {
  constructor(
  ) {}

  // async create(pasteId: string, data: NoteEntity) {
  //   const pasteExists = await this._paste_repository.verifyPasteExistById(
  //     pasteId
  //   );

  //   if (!pasteExists) throw new Error(`Paste does not exists`);

  //   const noteExists = await this._note_repository.verifyNoteExistByTitle(
  //     data.title
  //   );

  //   if (noteExists) throw new Error(`${noteExists} already exists`);

  //   const createdNote = await this._note_repository.createNote(pasteId, data);

  //   return createdNote;
  // }

  // async update(pasteId: string, noteId: string, data: NoteEntity) {
  //   const pasteExists = await this._paste_repository.verifyPasteExistById(
  //     pasteId
  //   );

  //   if (!pasteExists) throw new Error(`Paste does not exists`);

  //   const noteExists = await this._note_repository.verifyNoteExistById(noteId);

  //   if (!noteExists) throw new Error(`Note does not exists`);

  //   const updatedNote = await this._note_repository.updateNote(noteId, data);

  //   return updatedNote;
  // }

  // async findAll() {
  //   const listNotes = await this._note_repository.findAllNotes();

  //   return listNotes;
  // }

  // async findOne(pasteId: string, noteId: string) {
  //   const pasteExists = await this._paste_repository.verifyPasteExistById(
  //     pasteId
  //   );

  //   if (!pasteExists) throw new Error(`Paste does not exists`);

  //   const noteExists = await this._note_repository.verifyNoteExistById(noteId);

  //   if (!noteExists) throw new Error(`Note does not exists`);

  //   const listNote = await this._note_repository.findNoteById(noteId);

  //   return listNote;
  // }

  // async delete(pasteId: string, noteId: string) {
  //   const pasteExists = await this._paste_repository.verifyPasteExistById(
  //     pasteId
  //   );

  //   if (!pasteExists) throw new Error(`Paste does not exists`);

  //   const noteExists = await this._note_repository.verifyNoteExistById(noteId);

  //   if (!noteExists) throw new Error(`Note does not exists`);

  //   const deletedNote = await this._note_repository.deleteNoteById(noteId);

  //   return deletedNote;
  // }
}
