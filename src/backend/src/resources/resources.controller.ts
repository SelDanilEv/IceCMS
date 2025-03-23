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
import { CreateUpdateResourceDto } from './dto/CreateUpdateResourceDto';

@Controller('resources')
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) {}

  @Get()
  findAll() {
    return this.resourcesService.findAll();
  }

  // @Get(':name')
  // findOne(@Param('name') name: string) {
  //   return this.resourcesService.findOne(name);
  // }

  @Post()
  create(@Body() resourceDto: CreateUpdateResourceDto) {
    return this.resourcesService.create(resourceDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() resourceDto: CreateUpdateResourceDto,
  ) {
    return this.resourcesService.update(id, resourceDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.resourcesService.delete(id);
  }
}
