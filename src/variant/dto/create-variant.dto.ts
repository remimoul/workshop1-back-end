import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Image } from 'src/types/image';

export class CreateVariantDto {
  @ApiProperty({
    type: Number,
    description:
      "id chiffré permettant de faire la liaison avec les attributes lorsque l'on utilise l'api woocommerce",
    example: 2,
  })
  @IsNumber()
  id: number;

  @ApiProperty({
    type: String,
    description: "id de l'accessoire auquel le variant appartient",
    example: '66ec9f269e09c12798750493',
  })
  @IsString()
  readonly accessory_id: string;

  @ApiProperty({
    type: String,
    description: 'Nom du variant, généralement une couleur',
    examples: ['Purple', 'DarkGreen', 'ClearBlue'],
  })
  @IsString()
  readonly name: string;

  @ApiProperty({
    type: String,
    description:
      'hexcode utilisé pour le background-color des radios button sur le front',
    example: '#OOO',
  })
  @IsString()
  @IsOptional()
  readonly hexcode: string;

  @ApiProperty({
    type: Array,
    description:
      'tableau contenant les url de toutes les perspectives visuelles du variant',
    example: `[
    {frontViewUrl: 'http:localhost:3000/frontview.png'}, 
    {backViewUrl: 'http:localhost:3000/backview.png'},
    {sideViewUrl: 'http:localhost:3000/sideview.png'}]`,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Object)
  @IsOptional()
  readonly images: Image[];

  @ApiProperty({
    type: Boolean,
    description:
      "permet d'octroyer le variant qui a cette option sur true au default_attribute pour l'api woocommerce, valeur par défaut : false",
    examples: [true, false],
  })
  @IsBoolean()
  readonly isDefault: boolean;

  @ApiProperty({
    type: Number,
    description:
      "prix du variant s'il fait augmenter le prix total de l'article",
    example: 30,
  })
  @IsNumber()
  @IsOptional()
  readonly price?: number;

  @ApiProperty({
    type: Boolean,
    description: 'si la couleur du variant est transparente',
    example: [true, false],
  })
  @IsBoolean()
  @IsOptional()
  readonly isTransparent?: boolean;
}
