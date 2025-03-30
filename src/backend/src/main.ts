import { NestFactory } from '@nestjs/core';
import { CmsModule } from './Cms/cms.module';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(CmsModule);
  const port = parseInt(process.env.PORT || '3000', 10);

  app.enableCors({
    origin: 'http://localhost:48002', // Замените на ваш фронтенд URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
  });

  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  await app.listen(port);
}
bootstrap();
