import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Resource } from './schema/resource.schema';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class ResourcesService {
  constructor(
    @InjectModel('Resource') private readonly resourceModel: Model<Resource>,
  ) {}

  async findAll(): Promise<Resource[]> {
    return this.resourceModel.find().exec();
  }

  async findOne(name: string): Promise<Resource | null> {
    const existingResource = await this.resourceModel.findOne({ name }).exec();

    if (!existingResource) {
      throw new NotFoundException(`Resource with name "${name}" not found.`);
    }

    return existingResource;
  }

  async create(resourceDto): Promise<Resource> {
    const { name } = resourceDto;

    const existingResource = await this.resourceModel.findOne({ name }).exec();
    if (existingResource) {
      throw new NotFoundException(
        `Resource with name "${name}" already exists.`,
      );
    } else {
      const newResource = new this.resourceModel(resourceDto);
      return newResource.save();
    }
  }

  async update(name: string, resourceDto): Promise<Resource | null> {
    const existingResource = await this.resourceModel.findOne({ name }).exec();

    if (!existingResource) {
      throw new NotFoundException(`Resource with name "${name}" not found.`);
    }

    return this.resourceModel
      .findOneAndUpdate({ name }, resourceDto, { new: true })
      .exec();
  }

  async delete(name: string): Promise<any> {
    const existingResource = await this.resourceModel.findOne({ name }).exec();

    if (!existingResource) {
      throw new NotFoundException(`Resource with name "${name}" not found.`);
    }

    return this.resourceModel.findOneAndDelete({ name }).exec();
  }
}
