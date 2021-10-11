import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { GetCatFilterDto } from './dto/get-cats-filter';
import { UpdateCatDto } from './dto/update-cat.dto';
import { CatEntity } from './entities/cat.entity';
@UseGuards(AuthGuard())
@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  create(
    @Body() createCatDto: CreateCatDto,
    @GetUser() user: UserEntity,
  ): Promise<CreateCatDto> {
    return this.catsService.createSer(createCatDto, user);
  }

  @Get()
  findAll(
    @Query() filterDto: GetCatFilterDto,
    @GetUser() user: UserEntity,
  ): Promise<CatEntity[]> {
    if (Object.keys(filterDto).length) {
      console.log(user);
      return this.catsService.getCatWithFilter(filterDto, user);
    } else {
      return this.catsService.getAllCats();
    }
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: UserEntity,
  ): Promise<CatEntity> {
    return this.catsService.getCatById(id, user);
  }

  @Put(':id')
  update(
    @Body() updateCatDto: UpdateCatDto,
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: UserEntity,
  ): Promise<CatEntity> {
    return this.catsService.updateSer(id, updateCatDto, user);
  }

  @Delete(':id')
  delete(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: UserEntity,
  ): Promise<void> {
    return this.catsService.deleteSer(id, user);
  }
}
