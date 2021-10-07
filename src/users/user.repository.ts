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
    user.password = await this.hasPassword(password, user.salt);

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

  async validateUserPassword(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<UserEntity> {
    const { email, password } = authCredentialsDto;
    const user = await this.findOne({ email });

    if (user && (await user.validatePassword(password))) {
      return user;
    } else return null;
  }

  private async hasPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
