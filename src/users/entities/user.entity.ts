import * as bcrypt from 'bcrypt';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  /*  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  } */
}
