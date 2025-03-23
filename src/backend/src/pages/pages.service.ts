import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Page } from './schema/pages.schema';

@Injectable()
export class PagesService {
  constructor(@InjectModel('Page') private readonly pageModel: Model<Page>) {}

  async findAll(): Promise<Page[]> {
    return this.pageModel
      .find()
      .populate('templateId zones.resource scripts')
      .exec();
  }

  async findOne(nameId: string): Promise<Page | null> {
    const page = await this.pageModel.findOne({ nameId }).exec();
    if (!page) {
      throw new NotFoundException(`Page with ID "${nameId}" not found.`);
    }
    return page;
  }

  async create(pageDto): Promise<Page> {
    const { name } = pageDto;
    const existingPage = await this.pageModel.findOne({ name }).exec();

    if (existingPage) {
      throw new NotFoundException(`Page with ID "${name}" already exists.`);
    }

    const newPage = new this.pageModel(pageDto);
    return newPage.save();
  }

  async update(nameId: string, pageDto): Promise<Page | null> {
    const existingPage = await this.pageModel.findOne({ nameId }).exec();

    if (!existingPage) {
      throw new NotFoundException(`Page with ID "${nameId}" not found.`);
    }

    return this.pageModel
      .findOneAndUpdate({ nameId }, pageDto, { new: true })
      .exec();
  }

  async delete(nameId: string): Promise<any> {
    const existingPage = await this.pageModel.findOne({ nameId }).exec();

    if (!existingPage) {
      throw new NotFoundException(`Page with ID "${nameId}" not found.`);
    }

    return this.pageModel.findOneAndDelete({ nameId }).exec();
  }
}
