import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthDto } from './create-auth.dto';
import { IsEmail, IsString, IsOptional } from 'class-validator';

export class UpdateAuthDto extends PartialType(CreateAuthDto) {
  @IsEmail()
  @IsOptional()
  readonly email: string;

  @IsString()
  @IsOptional()
  readonly password: string;
}
