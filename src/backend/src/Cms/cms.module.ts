import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CmsController } from './cms.controller';
import { CmsService } from './cms.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [CmsController],
  providers: [CmsService],
})
export class CmsModule {}
