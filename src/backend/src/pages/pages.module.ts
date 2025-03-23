import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PagesService } from './pages.service';
import { PagesController } from './pages.controller';
import { PageSchema } from './schema/pages.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Page', schema: PageSchema }])],
  controllers: [PagesController],
  providers: [PagesService],
  exports: [PagesService, MongooseModule],
})
export class PagesModule {}
