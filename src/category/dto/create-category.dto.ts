import { IsString, IsNumber } from 'class-validator';

export class CreateCategoryDto {
  @IsNumber()
  readonly id: number;

  @IsString()
  readonly name: string;

  @IsNumber()
  readonly price: number;

  @IsNumber()
  readonly discount: number;
}
