import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAccessoryDto } from './dto/create-accessory.dto';
import { UpdateAccessoryDto } from './dto/update-accessory.dto';
import { Accessory } from './schema/accessory.schema';

import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class AccessoryService {
  constructor(
    @InjectModel(Accessory.name) private accessoryModel: Model<Accessory>,
  ) {}

  async create(createAccessoryDto: CreateAccessoryDto) {
    const accessory = new this.accessoryModel(createAccessoryDto);

    return accessory.save();
  }

  async findAll() {
    const accessories = await this.accessoryModel.find();

    if (!accessories) throw new NotFoundException(`No accessories found`);

    return accessories;
  }

  async findOne(id: string) {
    const accessory = await this.accessoryModel.findById(id);

    if (!accessory)
      throw new NotFoundException(`No accessories found with the id ${id}`);

    return accessory;
  }

  async findByCategory(categoryId: number) {
    const accessories = await this.accessoryModel
      .find({
        category_id: Number(categoryId),
      })
      .lean()
      .exec();

    if (!accessories || accessories.length === 0) {
      throw new NotFoundException(
        `No accessories found for the category id n°${categoryId}`,
      );
    }

    return accessories;
  }

  async update(id: string, updateAccessoryDto: UpdateAccessoryDto) {
    const accessory = await this.accessoryModel.findById(id);

    if (!accessory)
      throw new NotFoundException(`No accessories found with the id ${id}`);

    const updatedAccessory = await this.accessoryModel.findOneAndUpdate(
      accessory.id,
      updateAccessoryDto,
      { new: true },
    );
    return updatedAccessory;
  }

  async remove(id: string) {
    const accessory = await this.accessoryModel.findById(id);

    if (!accessory)
      throw new NotFoundException(`No accessories found with the id ${id}`);

    const deletedAccessory = await this.accessoryModel.findByIdAndDelete(id);

    return deletedAccessory;
  }
}
