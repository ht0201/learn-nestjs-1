import { UserEntity } from 'src/users/entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatEntity } from './entities/cat.entity';

@EntityRepository(CatEntity)
export class CatRepository extends Repository<CatEntity> {
  async createCat(cat: CreateCatDto, user: UserEntity): Promise<CatEntity> {
    const { name, age, breed } = cat;
    const newCat = new CatEntity();
    newCat.name = name;
    newCat.age = age;
    newCat.breed = breed;
    newCat.user = user;

    await newCat.save();
    return newCat;
  }
}
