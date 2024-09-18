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

  create(createAccessoryDto: CreateAccessoryDto) {
    return 'This action adds a new accessory';
  }

  findAll() {
    return `This action returns all accessory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} accessory`;
  }

  update(id: number, updateAccessoryDto: UpdateAccessoryDto) {
    return `This action updates a #${id} accessory`;
  }

  remove(id: number) {
    return `This action removes a #${id} accessory`;
  }
}
