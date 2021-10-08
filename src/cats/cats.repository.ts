import { EntityRepository, Repository } from 'typeorm';
import { CatEntity } from './entities/cat.entity';

@EntityRepository(CatEntity)
export class CatRepository extends Repository<CatEntity> {}
