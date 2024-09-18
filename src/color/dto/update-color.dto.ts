import { PartialType } from '@nestjs/mapped-types';
import { CreateColorDto } from './create-color.dto';
import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class UpdateColorDto extends PartialType(CreateColorDto) {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  code: string;

  @IsBoolean()
  @IsOptional()
  isTransparent: boolean;
}
