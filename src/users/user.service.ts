import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(user: CreateUserDto): Promise<CreateUserDto> {
    try {
      const newUser = await this.userRepository.create(user);
      await this.userRepository.save(newUser);
      return newUser;
    } catch {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll(): Promise<CreateUserDto[]> {
    return await this.userRepository.find();
  }

  async findOne(id: string): Promise<CreateUserDto> {
    const user = await this.userRepository.findOne(id);
    if (user) return user;

    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  async update(id: string, user: UpdateUserDto): Promise<UpdateUserDto> {
    await this.userRepository.update(id, user);
    const updateuser = await this.userRepository.findOne(id);
    if (updateuser) {
      return updateuser;
    }

    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  async delete(id: string): Promise<void> {
    const deleteRes = await this.userRepository.delete(id);
    if (!deleteRes.affected) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }
}
