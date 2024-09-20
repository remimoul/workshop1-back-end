import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CreateVariantDto } from './dto/create-variant.dto';
import { UpdateVariantDto } from './dto/update-variant.dto';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Variant } from './schema/variant.schema';

@Injectable()
export class VariantService {
  constructor(
    @InjectModel(Variant.name) private variantModel: Model<Variant>,
  ) {}

  async create(createVariantDto: CreateVariantDto) {
    createVariantDto.id = Date.now() + Math.floor(Math.random() * 1000);
    const variant = new this.variantModel(createVariantDto);
    if (!variant) throw new BadRequestException();
    return variant.save();
  }

  async findAll() {
    const variants = await this.variantModel.find();
    if (!variants) throw new NotFoundException('No variants found');
    return variants;
  }

  async findOne(id: number) {
    const variant = await this.variantModel.find({ id });
    if (!variant)
      throw new NotFoundException(`No variants found with the id ${id}`);
    return variant;
  }

  async update(id: number, updateVariantDto: UpdateVariantDto) {
    const variant = await this.variantModel.find({ id });

    if (!variant)
      throw new NotFoundException(`No variants found with the id ${id}`);

    const updatedVariant = await this.variantModel.findOneAndUpdate(
      { id },
      updateVariantDto,
      { new: true },
    );

    if (!updatedVariant) throw new BadRequestException(updatedVariant);

    return updatedVariant;
  }

  async remove(id: number) {
    const variant = await this.variantModel.find({ id });

    if (!variant)
      throw new NotFoundException(`No variants found with the id ${id}`);

    const deletedVariant = await this.variantModel.findOneAndDelete({ id });

    return deletedVariant;
  }
}
