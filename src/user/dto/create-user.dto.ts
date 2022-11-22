import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserTypes } from '../enum/user-type.enum';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  type: UserTypes;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;
}
