import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatRepository } from 'src/cats/cats.repository';
import { UserRepository } from 'src/users/user.repository';
import { AuthController } from './auth.controller';

import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt-strategy';

const passportModule = PassportModule.register({ defaultStrategy: 'jwt' });
@Module({
  imports: [
    passportModule,
    JwtModule.register({
      secret: 'topSecret51',
      signOptions: {
        expiresIn: 3600,
      },
    }),

    TypeOrmModule.forFeature([UserRepository, CatRepository]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy, passportModule],
})
export class AuthModule {}
