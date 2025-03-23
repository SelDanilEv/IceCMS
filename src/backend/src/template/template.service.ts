import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Template } from './schema/template.schema';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class TemplateService {
  constructor(
    @InjectModel('Template') private readonly templateModel: Model<Template>,
  ) {}

  async findAll(): Promise<Template[]> {
    return this.templateModel.find().exec();
  }

  async findOne(name: string): Promise<Template | null> {
    const existingTemplate = await this.templateModel.findOne({ name }).exec();

    if (!existingTemplate) {
      throw new NotFoundException(`Template with name "${name}" not found.`);
    }

    return existingTemplate;
  }

  async create(templateDto): Promise<Template> {
    const { name } = templateDto;

    const existingTemplate = await this.templateModel.findOne({ name }).exec();
    if (existingTemplate) {
      throw new NotFoundException(
        `Template with name "${name}" already exists.`,
      );
    } else {
      const newTemplate = new this.templateModel(templateDto);
      return newTemplate.save();
    }
  }

  async update(name: string, templateDto): Promise<Template | null> {
    const existingTemplate = await this.templateModel.findOne({ name }).exec();

    if (!existingTemplate) {
      throw new NotFoundException(`Template with name "${name}" not found.`);
    }

    return this.templateModel
      .findOneAndUpdate({ name }, templateDto, { new: true })
      .exec();
  }

  async delete(name: string): Promise<any> {
    const existingTemplate = await this.templateModel.findOne({ name }).exec();

    if (!existingTemplate) {
      throw new NotFoundException(`Template with name "${name}" not found.`);
    }

    return this.templateModel.findOneAndDelete({ name }).exec();
  }
}
