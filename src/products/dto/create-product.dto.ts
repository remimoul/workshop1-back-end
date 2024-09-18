import { IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Category } from 'src/types/category';
import { Image } from 'src/types/image';
import { Attribute } from 'src/types/attributes';

export class CreateProductDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly type: string;

  @IsString()
  readonly description: string;

  @IsString()
  readonly short_description: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Object)
  readonly categories: Category[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Object)
  readonly images: Image[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Object)
  readonly attributes: Attribute[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Object)
  readonly default_attributes: Attribute[];
}
