import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CmsController } from './cms.controller';
import { CmsService } from './cms.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ResourcesController } from '../resources/resources.controller';
import { ResourcesModule } from '../resources/resources.module';
import { ResourcesService } from '../resources/resources.service';
import { TemplateController } from '../template/template.controller';
import { TemplateModule } from '../template/template.module';
import { TemplateService } from '../template/template.service';
import { PagesController } from '../pages/pages.controller';
import { PagesModule } from '../pages/pages.module';
import { PagesService } from '../pages/pages.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    }),
    PagesModule,
    TemplateModule,
    ResourcesModule,
  ],
  controllers: [
    CmsController,
    ResourcesController,
    TemplateController,
    PagesController,
  ],
  providers: [CmsService, ResourcesService, TemplateService, PagesService],
})
export class CmsModule {}
