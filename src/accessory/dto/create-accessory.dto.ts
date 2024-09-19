import { Type } from 'class-transformer';
import {
  IsArray,
  IsString,
  IsOptional,
  ValidateNested,
  IsBoolean,
  IsNumber,
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

export class CreateAccessoryDto {
  @IsString()
  name: string;

  @IsString()
  category_id: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VariantDto)
  variants: VariantDto[];

  @IsBoolean()
  isBase: boolean;

  @IsString()
  @IsOptional()
  readonly description: string;
}
