import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CatsController } from './cats.controller';
import { CatRepository } from './cats.repository';
import { CatsService } from './cats.service';

@Module({
  imports: [TypeOrmModule.forFeature([CatRepository]), AuthModule],
  controllers: [CatsController],
  providers: [CatsService],
  exports: [TypeOrmModule],
})
export class CatsModule {}
