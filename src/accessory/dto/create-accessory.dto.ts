import { IsArray, IsString } from 'class-validator';
import { ColorType } from 'src/types/color';

export class CreateAccessoryDto {
  @IsString()
  readonly name: string;

  readonly category: any;

  @IsArray()
  readonly color: ColorType[];
}
