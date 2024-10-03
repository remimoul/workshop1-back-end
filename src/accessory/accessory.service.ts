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

  /**
   * Crée un nouvel accessoire avec l'objet data et l'objet images
   *
   * @param {CreateAccessoryDto} createAccessoryDto - Les DTO de data.
   * @param {Array<Express.Multer.File>} files - Tableau de pièces jointes.
   * @returns {Promise<Accessory>} L'objet accessoire sauvegardé.
   * @throws {BadRequestException} S'il manque les variants lors de l'upload de l'image ou si la sauvegarde des images échoue.
   */
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
}
