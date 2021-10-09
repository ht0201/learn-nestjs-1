import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/users/user.repository';
import { AuthCredentialsDto } from './dto/auth.credentials';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.signUpRepo(authCredentialsDto);
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    // check emal with db
    const user = await this.userRepository.authenticatedUserPassword(
      authCredentialsDto,
    );

    if (!user.email) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // create token by field email
    const payload: AuthCredentialsDto = { ...user };
    const accessToken = await this.jwtService.sign(payload);
    return { accessToken };
  }
}
