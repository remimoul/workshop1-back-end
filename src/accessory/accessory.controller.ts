import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  BadRequestException,
} from '@nestjs/common';
import { AccessoryService } from './accessory.service';
import { CreateAccessoryDto } from './dto/create-accessory.dto';
import { UpdateAccessoryDto } from './dto/update-accessory.dto';
import { Express } from 'express';
import {
  FileFieldsInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Controller('accessory')
export class AccessoryController {
  constructor(private readonly accessoryService: AccessoryService) {}

  @Post('/add')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'images', maxCount: 10 }]))
  async create(
    @Body('data') data: string,
    @UploadedFiles() files: { images?: Express.Multer.File[] },
  ) {
    console.log('Received data:', data);

    let createAccessoryDto: CreateAccessoryDto;

    try {
      const parsedData = JSON.parse(data);
      createAccessoryDto = plainToClass(CreateAccessoryDto, parsedData);
    } catch (error) {
      console.error('Error parsing data:', error);
      throw new BadRequestException('Invalid data format');
    }

    console.log('Parsed DTO:', createAccessoryDto);

    // Valider les données
    const errors = await validate(createAccessoryDto);
    if (errors.length > 0) {
      console.log('Validation errors:', errors);
      throw new BadRequestException(errors);
    }

    return this.accessoryService.create(
      createAccessoryDto,
      files?.images || [],
    );
  }

  @Get('/all')
  findAll() {
    return this.accessoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accessoryService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAccessoryDto: UpdateAccessoryDto,
  ) {
    return this.accessoryService.update(id, updateAccessoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accessoryService.remove(id);
  }
}
