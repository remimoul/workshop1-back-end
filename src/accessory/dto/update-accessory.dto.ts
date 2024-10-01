import { PartialType } from '@nestjs/mapped-types';
import { CreateAccessoryDto, VariantDto } from './create-accessory.dto';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
  isArray,
} from 'class-validator';
import { ColorType } from 'src/types/color';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAccessoryDto extends PartialType(CreateAccessoryDto) {
  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    description: "nom de l'accessoire",
    example: 'Coque arrière',
  })
  readonly name: string;

  @ApiProperty({
    type: Number,
    description: "id de la catégorie à laquelle l'accessoire appartient",
    example: '1',
  })
  readonly category_id: number;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UpdateVariantDto)
  @ApiProperty({
    type: [VariantDto],
    description: "Options de personnalisation de l'accessoire",
    example: [
      {
        name: 'Black',
        hexcode: '#000000',
        images: [
          { description: 'ceci est une coque arrière noire de Gameboy Color' },
        ],
        isTransparent: false,
      },
    ],
  })
  readonly variants: UpdateVariantDto[];

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    description: "description de l'accessoire",
    example: 'Coque avant de gameboy color',
  })
  readonly description: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    type: Boolean,
    description:
      "(true seulement pour les coques) est-ce que c'est l'image de base sur la superposition d'image sur le front ?",
    example: 'true',
  })
  readonly isBase: boolean;
}

class UpdateImageDto {
  @IsOptional()
  @IsString()
  frontViewUrl?: string;

  @IsOptional()
  @IsString()
  backViewUrl?: string;

  @IsOptional()
  @IsString()
  sideViewUrl?: string;

  @IsOptional()
  @IsString()
  description?: string;
}

export class UpdateVariantDto {
  @IsOptional()
  id: number;

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    description: "nom de l'accessoire",
    example: 'Coque arrière',
  })
  name: string;

  @IsString()
  @IsOptional()
  hexcode: string;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UpdateImageDto)
  images: UpdateImageDto[];

  @IsOptional()
  @IsBoolean()
  isTransparent?: boolean;

  @IsOptional()
  @IsBoolean()
  default: boolean;

  @IsOptional()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsBoolean()
  isDefault?: boolean;
}
