import { NestFactory } from '@nestjs/core';
import { CmsModule } from './Cms/cms.module';

async function bootstrap() {
  const app = await NestFactory.create(CmsModule);
  const port = parseInt(process.env.PORT || '3000', 10);
  await app.listen(port);
}
bootstrap();
