import { AppModule } from './app.module';
import { HttpExceptionFilter } from '@infra/http/exceptions/http-exception.filter';
import { NestFactory } from '@nestjs/core';

void (async (): Promise<void> => {
  const app = await NestFactory.create(AppModule);
  const port = 3001;

  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(port, () => {
    console.log(`API is running in http://localhost:${port}`);
  });
})();
