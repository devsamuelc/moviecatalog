import { IsString, IsEnum, IsUUID } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { UserTypes } from '../enum/user-type.enum';

export class UpdateUserDto {
  @IsUUID()
  @ApiPropertyOptional()
  id: string;

  @IsString()
  @ApiPropertyOptional()
  name: string;

  @IsEnum(UserTypes)
  @ApiPropertyOptional()
  userType: UserTypes;

  @IsString()
  @ApiPropertyOptional()
  password: string;
}
