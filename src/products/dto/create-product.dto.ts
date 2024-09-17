import { IsString, IsArray } from 'class-validator';
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
  readonly categories: Category[];

  @IsArray()
  readonly image: Image[];

  @IsArray()
  readonly attributes: Attribute[];

  @IsArray()
  readonly default_attributes: Attribute[];
}
