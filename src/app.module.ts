import { PrismaModule } from '@infra/prisma-database/prisma.module';
import { Module } from '@nestjs/common';
import { HttpModule } from '@infra/http/http.module';

@Module({
  imports: [PrismaModule, HttpModule],
})
export class AppModule {}
