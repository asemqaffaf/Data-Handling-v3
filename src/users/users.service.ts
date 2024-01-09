import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { Repository } from 'typeorm';
import { Users } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user = await this.userRepository.create(createUserDto);
      await this.userRepository.save(user);
      const { name, email } = user;

      return { name, email };
    } catch (error) {
      if (error.code === '23505') {
        /**
         * '23505' is the code for violation in PostgreSQL
         */
        throw new ConflictException('A user with this email already exists');
      }

      throw error;
    }
  }

  async findAll(): Promise<Users[]> {
    return await this.userRepository.find({ select: ['id', 'name', 'email'] });
  }

  async findOne(id: number): Promise<Users> {
    const user = await this.userRepository.findOne({
      where: { id },
      select: ['id', 'name', 'email'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    const updatedUser = Object.assign(user, updateUserDto);
    await this.userRepository.save(updatedUser);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }
    return;
  }

  async remove(id: number) {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }
    return `User with ID ${id} successfully deleted.`;
  }
}
