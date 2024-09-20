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

  async create(createColorDto: CreateColorDto): Promise<Color> {
    const { name } = createColorDto;

    const color = await this.ColorModel.findOne({ name });

    if (color) {
      throw new ConflictException(`Color ${name} already exists`);
    }

    const newColor = new this.ColorModel(createColorDto);
    return newColor.save();
  }

  async findAll(): Promise<Color[]> {
    const colors = await this.ColorModel.find();

    if (!colors) {
      throw new NotFoundException(`No colors found`);
    }

    return colors;
  }

  async findOne(id: string): Promise<Color> {
    const color = await this.ColorModel.findById(id);

    if (!color) {
      throw new NotFoundException(`No colors found with the id ${id}`);
    }

    return color;
  }

  async findOneByName(name: string): Promise<Color> {
    const color = await this.ColorModel.findOne({ name });

    if (!color) {
      throw new NotFoundException(`No colors found with the name ${name}`);
    }

    return color;
  }

  async update(id: number, updateColorDto: UpdateColorDto): Promise<Color> {
    const color = await this.ColorModel.findById(id);

    if (!color) {
      throw new NotFoundException(`No colors found with the id ${id}`);
    }

    const updatedColor = await this.ColorModel.findByIdAndUpdate(
      id,
      updateColorDto,
      { new: true },
    );

    return updatedColor;
  }

  async remove(id: number): Promise<Color> {
    const color = await this.ColorModel.findById(id);

    if (!color) {
      throw new NotFoundException(`No colors found with the id ${id}`);
    }

    const deletedColor = await this.ColorModel.findByIdAndDelete(id);

    return deletedColor;
  }
}
