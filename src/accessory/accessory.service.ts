import {
  Injectable,
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
import { validate } from 'class-validator';

@Injectable()
export class AccessoryService {
  constructor(
    @InjectModel(Accessory.name) private accessoryModel: Model<Accessory>,
  ) {}

  /**
   * Crée un nouvel accessoire avec l'objet data et l'objet images
   *
   * @param {CreateAccessoryDto} createAccessoryDto - Les DTO de data.
   * @param {Array<Express.Multer.File>} files - Tableau de pièces jointes.
   * @returns {Promise<Accessory>} L'objet accessoire sauvegardé.
   * @throws {BadRequestException} S'il manque les variants lors de l'upload de l'image ou si la sauvegarde des images échoue.
   */
  async create(
    createAccessoryDto: CreateAccessoryDto,
    files: {
      frontViewImage?: Express.Multer.File[];
      backViewImage?: Express.Multer.File[];
      sideViewImage?: Express.Multer.File[];
    },
  ) {
    console.log('Creating accessory with DTO:', createAccessoryDto);

    // Ajouter un id à chaque variant avant la validation
    if (createAccessoryDto.variants && createAccessoryDto.variants.length > 0) {
      createAccessoryDto.variants = createAccessoryDto.variants.map(
        (variant) => ({
          ...variant,
          id: Date.now() + Math.floor(Math.random() * 1000), // Pour éviter les doublons
        }),
      );
    }

    // Valider le DTO modifié
    const errors = await validate(createAccessoryDto);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    const newAccessory = new this.accessoryModel(createAccessoryDto);

    const saveFile = async (file?: Express.Multer.File) => {
      if (!file) return null;
      const { fileName } = await this.uploadFile(file);
      return `/uploads/${fileName}`;
    };

    if (newAccessory.variants && newAccessory.variants.length > 0) {
      for (const variant of newAccessory.variants) {
        for (const img of variant.images) {
          if (files.frontViewImage && files.frontViewImage.length > 0) {
            img.frontViewUrl = await saveFile(files.frontViewImage[0]);
          }
          if (files.backViewImage && files.backViewImage.length > 0) {
            img.backViewUrl = await saveFile(files.backViewImage[0]);
          }
          if (files.sideViewImage && files.sideViewImage.length > 0) {
            img.sideViewUrl = await saveFile(files.sideViewImage[0]);
          }
        }
      }
    } else {
      throw new BadRequestException(
        'Variants are required when uploading images',
      );
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

  /**
   * Sauvegarde un fichier sur le serveur.
   *
   * @param {Express.Multer.File} file - Le fichier a sauvegardé.
   * @returns {Promise<{fileName: string, path: string}>} Un objet contenant le nom et le chemin du fichier.
   * @throws {Error} Si la sauvegarde échoue.
   */
  async uploadFile(file: Express.Multer.File) {
    const fileName = `${Date.now()}-${file.originalname}`;
    const filePath = path.join(__dirname, '..', '..', 'uploads', fileName);

    await fs.promises.writeFile(filePath, file.buffer);

    return { fileName, path: filePath };
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
  }
}
