import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { TemplateService } from './template.service';

@Controller('template')
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  @Get()
  findAll() {
    return this.templateService.findAll();
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.templateService.findOne(name);
  }

  @Post()
  create(@Body() templateDto) {
    return this.templateService.create(templateDto);
  }

  @Put(':name')
  update(@Param('name') name: string, @Body() templateDto) {
    return this.templateService.update(name, templateDto);
  }

  @Delete(':name')
  delete(@Param('name') name: string) {
    return this.templateService.delete(name);
  }
}
