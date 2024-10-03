import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsNumber } from 'class-validator';

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
