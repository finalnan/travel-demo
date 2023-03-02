import { IsString, IsEmail, IsNotEmpty, IsEnum } from 'class-validator';
import { Role } from 'src/auth/role/role.enum';

export class ExistingUserDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(Role)
  role: string;
}
