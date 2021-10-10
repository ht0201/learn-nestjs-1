import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { createQueryBuilder } from 'typeorm';
import { CatRepository } from './cats.repository';
import { CreateCatDto } from './dto/create-cat.dto';
import { GetCatFilterDto } from './dto/get-cats-filter';
import { UpdateCatDto } from './dto/update-cat.dto';
import { CatEntity } from './entities/cat.entity';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(CatRepository)
    private catsRepository: CatRepository,
  ) {}

  async createSer(cat: CreateCatDto, user: UserEntity): Promise<CatEntity> {
    return this.catsRepository.createRep(cat, user);
  }

  /*  async getCatWithFilter(filterDto: GetCatFilterDto): Promise<CatEntity[]> {
    const { breed, search } = filterDto;
    let cats = await this.getAllCats();

    if (breed) {
      try {
        cats = (await cats).filter((cat) => cat.breed === breed);
      } catch (error) {
        console.log(error);
      }
    }

    if (search) {
      try {
        cats = (await cats).filter(
          (cat) =>
            cat.name.includes(search) || cat.age.toString().includes(search),
        );
      } catch (error) {
        console.log(error);
      }
    }

    return cats;
  } */

  async getCatWithFilter(
    filterDto: GetCatFilterDto,
    user: UserEntity,
  ): Promise<CatEntity[]> {
    return await this.catsRepository.getAllCatRep(filterDto, user);
  }

  async getAllCats(): Promise<CatEntity[]> {
    return await this.catsRepository.find();
  }

  async getCatById(id: number, user: UserEntity): Promise<CatEntity> {
    const cat = await this.catsRepository.findOne({
      where: { id, userId: user.id },
    });
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
