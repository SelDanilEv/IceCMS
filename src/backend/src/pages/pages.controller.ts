import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
} from '@nestjs/common';
import { PagesService } from './pages.service';

@Controller('pages')
export class PagesController {
    constructor(private readonly pagesService: PagesService) {}

    @Get()
    async findAll() {
        return this.pagesService.findAll();
    }

    @Get(':pageId')
    async findOne(@Param('pageId') pageId: string) {
        return this.pagesService.findOne(pageId);
    }

    @Post()
    async create(@Body() createPageDto) {
        return this.pagesService.create(createPageDto);
    }

    @Put(':pageId')
    async update(@Param('pageId') pageId: string, @Body() updatePageDto) {
        return this.pagesService.update(pageId, updatePageDto);
    }

    @Delete(':pageId')
    async delete(@Param('pageId') pageId: string) {
        return this.pagesService.delete(pageId);
    }
}
