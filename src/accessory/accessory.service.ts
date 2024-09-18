import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { CreateAccessoryDto } from './dto/create-accessory.dto';
import { UpdateAccessoryDto } from './dto/update-accessory.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Accessory } from './schema/accessory.schema';

@Injectable()
export class AccessoryService {
  constructor(
    @InjectModel(Accessory.name) private accessoryModel: Model<Accessory>,
  ) {}

  async create(createAccessoryDto: CreateAccessoryDto) {
    const newAccessory = new this.accessoryModel(createAccessoryDto);

    return newAccessory.save();
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

  async update(id: string, updateAccessoryDto: UpdateAccessoryDto) {
    const accessory = await this.accessoryModel.findById(id);

    if (!accessory)
      throw new NotFoundException(`No accessories found with the id ${id}`);

    const updatedAccessory = await this.accessoryModel.findByIdAndUpdate(
      id,
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
  }
}
