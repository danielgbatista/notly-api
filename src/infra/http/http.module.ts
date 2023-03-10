import { AuthModule } from './modules/auth.module';
import { Module } from '@nestjs/common';
import { NoteModule } from './modules/note.module';
import { PasteModule } from './modules/paste.module';
import UserModule from './modules/user.module';

@Module({
  imports: [AuthModule, UserModule, NoteModule, PasteModule]
})
export class HttpModule {}
