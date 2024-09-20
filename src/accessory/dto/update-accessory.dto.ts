import { PartialType } from '@nestjs/mapped-types';
import { CreateAccessoryDto } from './create-accessory.dto';
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

export class UpdateAccessoryDto extends PartialType(CreateAccessoryDto) {
  @IsString()
  @IsOptional()
  readonly name: string;

  readonly category: any;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UpdateVariantDto)
  readonly variants: UpdateVariantDto[];

  @IsString()
  @IsOptional()
  readonly description: string;
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
