import { APP_FILTER, BaseExceptionFilter } from '@nestjs/core';
import { HttpModule } from '@infra/http/http.module';
import { Module } from '@nestjs/common';
import { PrismaModule } from '@infra/prisma-database/prisma.module';

@Module({
  imports: [PrismaModule, HttpModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: BaseExceptionFilter
    }
  ]
})
export class AppModule {}
