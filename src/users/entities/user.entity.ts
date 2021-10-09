import { CatEntity } from 'src/cats/entities/cat.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
// @Unique(['email])
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({ unique: true })
  public email: string;

  @Column()
  public name?: string;

  @Column()
  public password: string;

  @Column()
  public salt: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToMany((type) => CatEntity, (cat) => cat.user, { eager: true })
  cats: CatEntity[];

  /*  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  } */
}
