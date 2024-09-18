import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Color } from './schema/color.schema';

@Injectable()
export class ColorService {
  constructor(@InjectModel(Color.name) private ColorModel: Model<Color>) {}

  async create(createColorDto: CreateColorDto) {
    const { name } = createColorDto;

    const color = await this.ColorModel.findOne(name);
  }

  findAll() {
    return `This action returns all color`;
  }

  findOne(id: number) {
    return `This action returns a #${id} color`;
  }

  update(id: number, updateColorDto: UpdateColorDto) {
    return `This action updates a #${id} color`;
  }

  remove(id: number) {
    return `This action removes a #${id} color`;
  }
}
