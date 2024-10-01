import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsString,
  IsOptional,
  ValidateNested,
  IsBoolean,
  IsNumber,
  IsInt,
} from 'class-validator';

class ImageDto {
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

export class VariantDto {
  id: number;

  @IsString()
  name: string;

  @IsString()
  hexcode: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImageDto)
  images: ImageDto[];

  @IsOptional()
  @IsBoolean()
  isTransparent?: boolean;

  @IsOptional()
  @IsBoolean()
  isDefault?: boolean;

  @IsOptional()
  @IsBoolean()
  default: boolean;

  @IsOptional()
  @IsNumber()
  price: number;
}

export class CreateAccessoryDto {
  @IsString()
  @ApiProperty({
    type: String,
    description: "nom de l'accessoire",
    example: 'Coque arrière',
  })
  name: string;

  @ApiProperty({
    type: Number,
    description: "id de la catégorie à laquelle l'accessoire appartient",
    example: '1',
  })
  @IsNumber()
  category_id: number;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => VariantDto)
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
  variants?: VariantDto[];

  @IsBoolean()
  @ApiProperty({
    type: Boolean,
    description:
      "(true seulement pour les coques) est-ce que c'est l'image de base sur la superposition d'image sur le front ?",
    example: 'true',
  })
  isBase: boolean;

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    description: "description de l'accessoire",
    example: 'Coque avant de gameboy color',
  })
  readonly description: string;
}
