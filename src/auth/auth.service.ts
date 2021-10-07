import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/users/user.repository';
import { AuthCredentialsDto } from './dto/auth.credentials';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.signUpRepo(authCredentialsDto);
  }
  async signIn(authCredentialsDto: AuthCredentialsDto) {
    const email = await this.userRepository.validateUserPassword(
      authCredentialsDto,
    );
    console.log(email);

    if (!email) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
