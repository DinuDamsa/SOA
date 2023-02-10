import { NestFactory } from '@nestjs/core';
import * as cors from 'cors';
import { AppModule } from './app.module';
import { PORT } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options: cors.CorsOptions = {
    origin: '*',
  };
  app.use(cors(options));
  await app.listen(PORT);
}
bootstrap().then(() => console.log(`Server started on port ${PORT}`));
