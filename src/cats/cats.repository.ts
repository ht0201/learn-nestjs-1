import { UserEntity } from 'src/users/entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateCatDto } from './dto/create-cat.dto';
import { GetCatFilterDto } from './dto/get-cats-filter';
import { CatEntity } from './entities/cat.entity';

@EntityRepository(CatEntity)
export class CatRepository extends Repository<CatEntity> {
  async createRep(
    createCatDto: CreateCatDto,
    user: UserEntity,
  ): Promise<CatEntity> {
    const { name, age, breed } = createCatDto;

    const newCat = new CatEntity();
    newCat.name = name;
    newCat.age = age;
    newCat.breed = breed;
    newCat.userId = user.id;
    await newCat.save();

    // delete name newCat.user;
    return newCat;
  }

  async getAllCatRep(
    filterDto: GetCatFilterDto,
    user: UserEntity,
  ): Promise<CatEntity[]> {
    const { breed, search } = filterDto;
    const query = this.createQueryBuilder('cat_entity');
    console.log(user);

    query.where('cat_entity.userId = :userId', { userId: user.id });

    if (breed) {
      query.andWhere('cat_entity.breed = :breed', { breed });
    }

    if (search) {
      query.andWhere(
        '(cat_entity.name LIKE :search OR cat_entity.age LIKE :search)',
        {
          search: `%${search}%`,
        },
      );
    }

    const cats = await query.getMany();

    return cats;
  }
}
