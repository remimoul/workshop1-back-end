import { IsString, IsBoolean } from 'class-validator';

export class CreateColorDto {
  @IsString()
  name: string;

  @IsString()
  code: string;

  @IsBoolean()
  isTransparent: boolean;
}
