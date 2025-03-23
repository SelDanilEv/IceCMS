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
import { CreateUpdateTemplateDto } from './dto/CreateUpdateTemplateDto';

@Controller('template')
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  @Get()
  findAll() {
    return this.templateService.findAll();
  }

  // @Get(':name')
  // findOne(@Param('name') name: string) {
  //   return this.templateService.findOne(name);
  // }

  @Post()
  create(@Body() templateDto: CreateUpdateTemplateDto) {
    return this.templateService.create(templateDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() templateDto: CreateUpdateTemplateDto,
  ) {
    return this.templateService.update(id, templateDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.templateService.delete(id);
  }
}
