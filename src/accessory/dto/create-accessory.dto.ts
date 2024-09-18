import { IsArray, IsString } from 'class-validator';
import { ColorType } from 'src/types/color';

export class CreateAccessoryDto {
  @IsString()
  readonly name: string;

  readonly category_id: any;

  @IsArray()
  readonly color: ColorType[];
}
