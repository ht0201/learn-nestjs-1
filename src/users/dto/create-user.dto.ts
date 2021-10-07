import { IsEmail, IsEmpty, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  name?: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
