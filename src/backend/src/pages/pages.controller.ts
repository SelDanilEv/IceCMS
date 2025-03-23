import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { PagesService } from './pages.service';
import { CreateUpdatePageDto } from './dto/CreateUpdatePageDto';

@Controller('pages')
export class PagesController {
  constructor(private readonly pagesService: PagesService) {}

  @Get()
  async findAll() {
    return this.pagesService.findAll();
  }

  // @Get(':pageId')
  // async findOne(@Param('pageId') pageId: string) {
  //   return this.pagesService.findOne(pageId);
  // }

  @Post()
  create(@Body() createPageDto: CreateUpdatePageDto) {
    return this.pagesService.create(createPageDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePageDto: CreateUpdatePageDto) {
    return this.pagesService.update(id, updatePageDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.pagesService.delete(id);
  }
}
