import { PartialType } from '@nestjs/mapped-types';
import { CreateAccessoryDto } from './create-accessory.dto';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
  isArray,
} from 'class-validator';
import { ColorType } from 'src/types/color';
import { Type } from 'class-transformer';

export class UpdateAccessoryDto extends PartialType(CreateAccessoryDto) {
  @IsString()
  @IsOptional()
  readonly name: string;

  readonly category: any;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => VariantDto)
  readonly variants: VariantDto[];

  @IsString()
  @IsOptional()
  readonly description: string;
}

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

class VariantDto {
  // @IsNumber()
  // id: number;

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
  default: boolean;

  @IsOptional()
  @IsNumber()
  price: number;
}
