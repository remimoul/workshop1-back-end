import { PartialType } from '@nestjs/mapped-types';
import { CreateAccessoryDto } from './create-accessory.dto';
import { IsArray, IsOptional, IsString, isArray } from 'class-validator';
import { ColorType } from 'src/types/color';

export class UpdateAccessoryDto extends PartialType(CreateAccessoryDto) {
  @IsString()
  @IsOptional()
  readonly name: string;

  readonly category: any;

  @IsArray()
  @IsOptional()
  readonly color: ColorType[];
}
