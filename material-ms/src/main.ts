import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from './config';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options: cors.CorsOptions = {
    origin: '*',
  };
  app.use(cors(options));
  await app.listen(PORT);
}

bootstrap().then(() => console.log(`Server started on port ${PORT}`));
