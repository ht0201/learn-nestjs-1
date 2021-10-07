import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { CatEntity } from './entities/cat.entity';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(CatEntity)
    private catsRepository: Repository<CatEntity>,
  ) {}

  async create(cat: CreateCatDto): Promise<CreateCatDto> {
    const newCat = await this.catsRepository.create(cat);
    await this.catsRepository.save(newCat);
    return newCat;
  }

  async findAll(): Promise<CreateCatDto[]> {
    return await this.catsRepository.find();
  }

  async findOne(id: string): Promise<CreateCatDto> {
    const cat = await this.catsRepository.findOne(id);
    if (cat) return cat;

    throw new HttpException('Cat not found', HttpStatus.NOT_FOUND);
  }

  async update(id: string, cat: UpdateCatDto): Promise<UpdateCatDto> {
    await this.catsRepository.update(id, cat);
    const updateCat = await this.catsRepository.findOne(id);
    if (updateCat) {
      return updateCat;
    }

    throw new HttpException('Cat not found', HttpStatus.NOT_FOUND);
  }

  async delete(id: string): Promise<void> {
    const deleteRes = await this.catsRepository.delete(id);
    if (!deleteRes.affected) {
      throw new HttpException('Cat not found', HttpStatus.NOT_FOUND);
    }
  }
}
