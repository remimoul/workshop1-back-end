import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateAccessoryDto, VariantDto } from './dto/create-accessory.dto';
import {
  UpdateAccessoryDto,
  UpdateVariantDto,
} from './dto/update-accessory.dto';
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
  // async create(
  //   createAccessoryDto: CreateAccessoryDto,

  // ) {

  //   // Ajouter un id à chaque variant avant la validation
  //   if (createAccessoryDto.variants && createAccessoryDto.variants.length > 0) {
  //     createAccessoryDto.variants = createAccessoryDto.variants.map(
  //       (variant) => ({
  //         ...variant,
  //         id: Date.now() + Math.floor(Math.random() * 1000), // Pour éviter les doublons
  //       }),
  //     );
  //   }

  //   // Valider le DTO modifié
  //   const errors = await validate(createAccessoryDto);
  //   if (errors.length > 0) {
  //     throw new BadRequestException(errors);
  //   }

  //   const newAccessory = new this.accessoryModel(createAccessoryDto);

  //   const saveFile = async (file?: Express.Multer.File) => {
  //     if (!file) return null;
  //     const { fileName } = await this.uploadFile(file);
  //     return `/uploads/${fileName}`;
  //   };

  //   if (newAccessory.variants && newAccessory.variants.length > 0) {
  //     for (const variant of newAccessory.variants) {
  //       for (const img of variant.images) {
  //         if (files.frontViewImage && files.frontViewImage.length > 0) {
  //           img.frontViewUrl = await saveFile(files.frontViewImage[0]);
  //         }
  //         if (files.backViewImage && files.backViewImage.length > 0) {
  //           img.backViewUrl = await saveFile(files.backViewImage[0]);
  //         }
  //         if (files.sideViewImage && files.sideViewImage.length > 0) {
  //           img.sideViewUrl = await saveFile(files.sideViewImage[0]);
  //         }
  //       }
  //     }
  //   } else {
  //     throw new BadRequestException(
  //       'Variants are required when uploading images',
  //     );
  //   }

  //   try {
  //     const savedAccessory = await newAccessory.save();
  //     console.log('Accessory saved successfully:', savedAccessory);
  //     const variantIds = savedAccessory.variants.map((variant) => variant.id);

  //     return {
  //       savedAccessory,
  //       variantIds,
  //     };
  //   } catch (error) {
  //     console.error('Error saving accessory:', error);
  //     throw new BadRequestException('Failed to save accessory');
  //   }
  // }

  async create(createAccessoryDto: CreateAccessoryDto) {
    const accessory = new this.accessoryModel(createAccessoryDto);

    return accessory.save();
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

  async findByCategory(categoryId: number) {
    const accessories = await this.accessoryModel
      .find({
        category_id: Number(categoryId), // Conversion explicite
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

  async getVariantById(variantId: number) {
    const accessory = await this.accessoryModel.findOne(
      { 'variants.id': variantId },
      { 'variants.$': 1 },
    );

    if (!accessory) {
      throw new NotFoundException(
        `No accessory found with variant id ${variantId}`,
      );
    }

    if (!accessory.variants || accessory.variants.length === 0) {
      throw new NotFoundException(`Variant with id ${variantId} not found`);
    }
    console.log(variantId);
    return accessory.variants[0];
  }

  async addVariant(accessoryId: string, newVariant: VariantDto) {
    const accessory = await this.accessoryModel.findById(accessoryId);

    if (!accessory) {
      throw new NotFoundException(`No accessories with id ${accessoryId}`);
    }

    newVariant.id = Date.now() + Math.floor(Math.random() * 1000);

    accessory.variants.push(newVariant);

    const updatedAccessory = await this.accessoryModel.findByIdAndUpdate(
      accessoryId, // Utilisez l'identifiant ici
      { variants: accessory.variants }, // Mettez à jour uniquement les variants
      { new: true }, // Retourne le document mis à jour
    );

    console.log('variants: ', accessory.variants);

    return updatedAccessory;
  }

  async updateVarient(varientId, varientDto: UpdateVariantDto) {
    const varient = await this.accessoryModel.findOne({ id: varientId });

    if (!varient)
      throw new NotFoundException(`No varients with the id${varientId}`);

    const updatedVarient = await this.accessoryModel.findOneAndUpdate(
      { id: varientId, varientDto },
      { new: true },
    );
    return updatedVarient;
  }
}
