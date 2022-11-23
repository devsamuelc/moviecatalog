import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Req,
  Param,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiBody({ type: CreateUserDto })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.getById(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  update(@Req() req: any, @Body() updateUserDto: UpdateUserDto) {
    if (req.userType === 'admin') {
      return this.userService.update(updateUserDto.id, updateUserDto);
    }

    return this.userService.update(req.user, updateUserDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  remove(@Req() req: any, @Param('id') id: string) {
    if (req.userType === 'admin') {
      return this.userService.remove(id);
    }
    return this.userService.remove(req.user);
  }
}
