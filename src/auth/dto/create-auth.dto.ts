import { IsEmail, IsString } from 'class-validator';

export class CreateAuthDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly password: string;
}
