import {
  Injectable,
  ConflictException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateAccessoryDto } from './dto/create-accessory.dto';
import { UpdateAccessoryDto } from './dto/update-accessory.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Accessory } from './schema/accessory.schema';

import * as fs from 'fs';
import * as path from 'path';
import { Image } from 'src/types/image';

@Injectable()
export class AccessoryService {
  constructor(
    @InjectModel(Accessory.name) private accessoryModel: Model<Accessory>,
  ) {}

  async create(
    createAccessoryDto: CreateAccessoryDto,
    files: Array<Express.Multer.File>,
  ) {
    console.log('Creating accessory with DTO:', createAccessoryDto);
    console.log('Number of files:', files.length);

    const newAccessory = new this.accessoryModel(createAccessoryDto);

    if (files && files.length > 0) {
      const images = await this.saveFiles(files);
      if (newAccessory.variants && newAccessory.variants.length > 0) {
        newAccessory.variants.forEach((variant, index) => {
          const variantImages = images.slice(index * 3, (index + 1) * 3);
          variant.images = variant.images.map((img, imgIndex) => ({
            ...img,
            src: variantImages[imgIndex]?.src || '',
            name: variantImages[imgIndex]?.name || '',
            alt: variantImages[imgIndex]?.alt || '',
          }));
        });
      } else {
        throw new BadRequestException(
          'Variants are required when uploading images',
        );
      }
    }

    try {
      const savedAccessory = await newAccessory.save();
      console.log('Accessory saved successfully:', savedAccessory);
      return savedAccessory;
    } catch (error) {
      console.error('Error saving accessory:', error);
      throw new BadRequestException('Failed to save accessory');
    }
  }

  async uploadFile(file: Express.Multer.File) {
    const fileName = `${Date.now()}-${file.originalname}`;
    const filePath = path.join(__dirname, '..', '..', 'uploads', fileName);

    await fs.promises.writeFile(filePath, file.buffer);

    return { fileName, path: filePath };
  }

  private async saveFiles(files: Array<Express.Multer.File>): Promise<Image[]> {
    const savedFiles: Image[] = [];

    for (const file of files) {
      const { fileName, path } = await this.uploadFile(file);
      savedFiles.push({
        src: path,
        name: fileName,
        alt: file.originalname,
      });
    }

    return savedFiles;
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
