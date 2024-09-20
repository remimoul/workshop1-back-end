import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AccessoryService } from './accessory.service';
import { CreateAccessoryDto, VariantDto } from './dto/create-accessory.dto';
import {
  UpdateAccessoryDto,
  UpdateVariantDto,
} from './dto/update-accessory.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('accessories')
@Controller('accessory')
export class AccessoryController {
  constructor(private readonly accessoryService: AccessoryService) {}

  @Post('/add')
  async create(@Body() createAccessoryDto: CreateAccessoryDto) {
    return this.accessoryService.create(createAccessoryDto);
  }

  @Get('/all')
  findAll() {
    return this.accessoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accessoryService.findOne(id);
  }

  @Get('/category/:categoryId')
  findByCategory(@Param('categoryId') categoryId: number) {
    return this.accessoryService.findByCategory(categoryId);
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

  @Get('/variant/:variantId')
  getVariantById(@Param('variantId') variantId: string) {
    return this.accessoryService.getVariantById(+variantId);
  }

  @Patch('/:accessoryId/variant')
  addVariant(
    @Param('accessoryId') accessoryId: string,
    @Body() newVariant: VariantDto,
  ) {
    return this.accessoryService.addVariant(accessoryId, newVariant);
  }

  @Patch('/:accessoryId/variant/:variantId')
  updateVarient(
    @Param('accessoryId') accessoryId: string,
    @Param('variantId') variantId: number,
    @Body() variantDto: UpdateVariantDto,
  ) {
    return this.accessoryService.updateVariant(
      accessoryId,
      variantId,
      variantDto,
    );
  }
}
