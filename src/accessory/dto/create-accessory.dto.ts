import { Type } from 'class-transformer';
import {
  IsArray,
  IsString,
  IsOptional,
  ValidateNested,
  IsMongoId,
  IsBoolean,
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

  @IsOptional()
  @IsBoolean()
  isBased?: boolean;
}

class VariantDto {
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
}

export class CreateAccessoryDto {
  @IsString()
  name: string;

  @IsMongoId()
  category_id: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VariantDto)
  variants: VariantDto[];
}
