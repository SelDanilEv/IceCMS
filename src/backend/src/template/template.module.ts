import { Module } from '@nestjs/common';
import { TemplateController } from './template.controller';
import { TemplateService } from './template.service';
import { TemplateSchema } from './schema/template.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Template', schema: TemplateSchema }]),
  ],
  controllers: [TemplateController],
  providers: [TemplateService],
  exports: [MongooseModule, TemplateService],
})
export class TemplateModule {}
