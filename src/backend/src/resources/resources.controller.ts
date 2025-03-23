import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ResourcesService } from './resources.service';

@Controller('resources')
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) {}

  @Get()
  findAll() {
    return this.resourcesService.findAll();
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.resourcesService.findOne(name);
  }

  @Post()
  create(@Body() resourceDto) {
    return this.resourcesService.create(resourceDto);
  }

  @Put(':name')
  update(@Param('name') name: string, @Body() resourceDto) {
    return this.resourcesService.update(name, resourceDto);
  }

  @Delete(':name')
  delete(@Param('name') name: string) {
    return this.resourcesService.delete(name);
  }
}
