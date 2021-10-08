import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthCredentialsDto } from 'src/auth/dto/auth.credentials';
import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async signUpRepo(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { email, name, password } = authCredentialsDto;

    const user = new UserEntity();
    user.email = email;
    user.name = name;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);

    try {
      await user.save();
    } catch (error) {
      // duplicate email
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  async authenticatedUserPassword(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<UserEntity> {
    const { email, password } = authCredentialsDto;
    const user = await this.findOne({ email });
    const hashInputPw =
      (await this.hashPassword(password, user.salt)) === user.password
        ? true
        : false;

    if (user && hashInputPw) {
      return user;
    } else return null;
  }
}
