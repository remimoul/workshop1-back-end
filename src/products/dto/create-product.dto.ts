import { IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Category } from 'src/types/category';
import { Image } from 'src/types/image';
import { Attribute } from 'src/types/attribute';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @IsString()
  @ApiProperty({
    type: String,
    description: 'nom du produit, récupéré du category.name',
    example: 'PS Vita',
  })
  readonly name: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'required field pour l api woocommerce',
    example: 'simple',
  })
  readonly type: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'description récupéré de accessory.description',
    example: 'ceci est une coque avant de gameboy colors',
  })
  readonly description: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'description récupéré de accessory.description',
    example: 'ceci est une coque avant de gameboy colors',
  })
  readonly short_description: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Object)
  @ApiProperty({
    type: Array,
    description: 'tableau de category.id',
    example: '[1, 24]',
  })
  readonly categories: Category[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Object)
  @ApiProperty({
    type: Array,
    description: 'tableau d image,',
    example: '[{src: "http:image_url.fr"}]',
  })
  readonly images: Image[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Object)
  @ApiProperty({
    type: Array,
    description: 'accessory.variants reformaté',
    example:
      '[{"name": "attribute.name", "options": [{variant.name, variant.hexcode}]}]',
  })
  readonly attributes: Attribute[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Object)
  @ApiProperty({
    type: Array,
    description: 'tableau contenant un attribut',
    example:
      '[{"name": "attribute.name", "options": [{variant.name, variant.hexcode}]}]',
  })
  readonly default_attributes: Attribute[];
}
