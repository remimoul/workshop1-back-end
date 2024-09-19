import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @IsNumber()
  @IsOptional()
  readonly id: number;

  @IsString()
  @IsOptional()
  readonly name: string;

  @IsNumber()
  @IsOptional()
  readonly price: number;

  @IsNumber()
  @IsOptional()
  readonly deviceDiscount: number;

  @IsString()
  @IsOptional()
  readonly description: string;
}
