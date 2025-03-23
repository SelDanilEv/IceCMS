import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Resource } from './schema/resource.schema';
import { NotFoundException } from '@nestjs/common';
import { v7 as uuidv7 } from 'uuid';
import { CreateUpdateResourceDto } from './dto/CreateUpdateResourceDto';
import { createResourceDto, ResourceDto } from './dto/ResourceDto';

@Injectable()
export class ResourcesService {
  constructor(
    @InjectModel('Resource') private readonly resourceModel: Model<Resource>,
  ) {}

  async findAll(): Promise<Resource[]> {
    return this.resourceModel.find().exec();
  }

  async findOne(name: string): Promise<Resource | null> {
    const existingResource = await this.resourceModel
      .findOne({ id: name })
      .exec();

    if (!existingResource) {
      throw new NotFoundException(`Resource with name "${name}" not found.`);
    }

    return existingResource;
  }

  async create(resourceDto: CreateUpdateResourceDto): Promise<ResourceDto> {
    const existingResource = await this.resourceModel
      .findOne({ id: resourceDto.name })
      .exec();

    if (existingResource)
      throw new NotFoundException(
        `Resource with name "${resourceDto.name}" already exists.`,
      );

    const newResource = new this.resourceModel({
      _id: uuidv7(),
      ...resourceDto,
    });

    const savedResource = await newResource.save();

    return createResourceDto(savedResource);
  }

  async update(id: string, resourceDto): Promise<ResourceDto | null> {
    const existingResource = await this.resourceModel
      .findOne({ _id: id })
      .exec();

    console.log('id', id);

    if (!existingResource) {
      throw new NotFoundException(`Resource with id "${id}" not found.`);
    }

    const savedResource = await this.resourceModel
      .findOneAndUpdate({ _id: id }, resourceDto, { new: true })
      .exec();

    if (!savedResource) {
      throw new NotFoundException(`Resource with id "${id}" not found.`);
    }

    return createResourceDto(savedResource);
  }

  async delete(id: string): Promise<any> {
    const existingResource = await this.resourceModel
      .findOne({ _id: id })
      .exec();

    if (!existingResource) {
      throw new NotFoundException(`Resource with name "${id}" not found.`);
    }

    return this.resourceModel.findOneAndDelete({ _id: id }).exec();
  }
}
