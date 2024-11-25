import { PartialType } from '@nestjs/mapped-types';
import { CreateAccessoryDto } from './create-accessory.dto';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAccessoryDto extends PartialType(CreateAccessoryDto) {
  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    description: "nom de l'accessoire",
    example: 'Coque arrière',
  })
  readonly name?: string;

  @ApiProperty({
    type: Number,
    description: "id de la catégorie à laquelle l'accessoire appartient",
    example: '1',
  })
  readonly category_id?: number;

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    description: "description de l'accessoire",
    example: 'Coque avant de gameboy color',
  })
  readonly description?: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    type: Boolean,
    description:
      "(true seulement pour les coques) est-ce que c'est l'image de base sur la superposition d'image sur le front ?",
    example: 'true',
  })
  readonly isBase?: boolean;
}
