import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { CatRepository } from './cats.repository';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { CatEntity } from './entities/cat.entity';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(CatRepository)
    private catsRepository: CatRepository,
  ) {}

  async createSer(cat: CreateCatDto, user: UserEntity): Promise<CatEntity> {
    return await this.catsRepository.createCat(cat, user);
  }

  async findAll(): Promise<CatEntity[]> {
    return await this.catsRepository.find();
  }

  async findOne(id: number): Promise<CatEntity> {
    const cat = await this.catsRepository.findOne(id);
    if (!cat) {
      throw new HttpException('Cat not found', HttpStatus.NOT_FOUND);
    }
    return cat;
  }

  async updateSer(id: number, cat: UpdateCatDto): Promise<CatEntity> {
    await this.catsRepository.update(id, cat);
    const updateCat = await this.catsRepository.findOne(id);
    if (!updateCat) {
      throw new HttpException('Cat not found', HttpStatus.NOT_FOUND);
    }
    return updateCat;
  }

  async deleteSer(id: number): Promise<void> {
    const deleteRes = await this.catsRepository.delete(id);
    if (!deleteRes.affected) {
      throw new NotFoundException(`Cat ${id} not found`);
    }
  }
}
