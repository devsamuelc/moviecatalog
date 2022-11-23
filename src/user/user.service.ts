import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const { name, email, password } = createUserDto;

      const user = await this.userRepository.save(
        this.userRepository.create({ name, email, password }),
      );

      return user;
    } catch (error) {
      return error.message;
    }
  }

  async getById(id: string) {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
      relations: ['movies'],
    });
    if (!user) throw Error('User Not Found');

    return user;
  }

  async getByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
      relations: ['movies']
    })
    if (!user) throw Error('User Not Found')

    return user;
  }

  async findAll() {
    try {
      const users = await this.userRepository.find();

      return users;
    } catch (error) {
      return error.message;
    }
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    try {
      delete updateUserDto.id;

      const update = this.userRepository
        .createQueryBuilder()
        .update(updateUserDto)
        .where({
          id,
        })
        .returning('*')
        .execute();

      return update;
    } catch (error) {
      return error.message;
    }
  }

  async remove(id: string) {
    try {
      await this.userRepository.delete({ id });

      return 'User deleted successfully';
    } catch (error) {
      return error.message;
    }
  }
}
