import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Page } from './schema/pages.schema';
import { NotFoundException } from '@nestjs/common';
import { v7 as uuidv7 } from 'uuid';
import { CreateUpdatePageDto } from './dto/CreateUpdatePageDto';
import { createPageDto, PageDto } from './dto/PageDto';

@Injectable()
export class PagesService {
  constructor(@InjectModel('Page') private readonly pageModel: Model<Page>) {}

  async findAll(): Promise<Page[]> {
    return this.pageModel
      .find()
      .populate('templateId zones.resource scripts')
      .exec();
  }

  async findOne(id: string): Promise<Page | null> {
    const existingPage = await this.pageModel.findOne({ id: id }).exec();

    if (!existingPage) {
      throw new NotFoundException(`Resource with name "${id}" not found.`);
    }

    return existingPage;
  }

  async create(pageDto: CreateUpdatePageDto): Promise<PageDto> {
    const existingPage = await this.pageModel
      .findOne({ id: pageDto.name })
      .exec();

    if (existingPage)
      throw new NotFoundException(
        `Resource with name "${pageDto.name}" already exists.`,
      );

    const newPage = new this.pageModel({
      _id: uuidv7(),
      ...pageDto,
    });

    const savedPage = await newPage.save();

    return createPageDto(savedPage);
  }

  async update(id: string, pageDto): Promise<PageDto | null> {
    const existingPage = await this.pageModel.findOne({ _id: id }).exec();

    console.log('id', id);

    if (!existingPage) {
      throw new NotFoundException(`Resource with id "${id}" not found.`);
    }

    const savedPage = await this.pageModel
      .findOneAndUpdate({ _id: id }, pageDto, { new: true })
      .exec();

    if (!savedPage) {
      throw new NotFoundException(`Resource with id "${id}" not found.`);
    }

    return createPageDto(savedPage);
  }

  async delete(id: string): Promise<any> {
    const existingPage = await this.pageModel.findOne({ _id: id }).exec();

    if (!existingPage) {
      throw new NotFoundException(`Resource with name "${id}" not found.`);
    }

    return this.pageModel.findOneAndDelete({ _id: id }).exec();
  }
}
