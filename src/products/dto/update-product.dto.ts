import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsString, IsArray, IsOptional } from 'class-validator';
import { Category } from 'src/types/category';
import { Image } from 'src/types/image';
import { Attribute } from 'src/types/attributes';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsString()
  @IsOptional()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly type: string;

  @IsString()
  @IsOptional()
  readonly description: string;

  @IsString()
  @IsOptional()
  readonly short_description: string;

  @IsArray()
  @IsOptional()
  readonly categories: Category[];

  @IsArray()
  @IsOptional()
  readonly image: Image[];

  @IsArray()
  @IsOptional()
  readonly attributes: Attribute[];

  @IsArray()
  @IsOptional()
  readonly default_attributes: Attribute[];
}
