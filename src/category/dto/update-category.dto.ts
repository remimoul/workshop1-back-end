import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';
import { IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @IsNumber()
  @IsOptional()
  @ApiProperty({
    type: Number,
    description:
      "id en chiffre de la catégorie, pour adapter à l'API woocommerce",
    example: '1',
  })
  readonly id: number;

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    description: 'nom de la catégorie, ici ce sont des noms de console',
    example: 'PS Vita',
  })
  readonly name: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    type: String,
    description: 'prix de base de la console',
    example: '100',
  })
  readonly price: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    type: String,
    description:
      'réduction de prix (euros) si le client amène sa console, appliqué grâce à un props venant du front',
    example: '40',
  })
  readonly deviceDiscount: number;
}
