import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { CatEntity } from './entities/cat.entity';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  @UseGuards(AuthGuard())
  create(
    @Body() createCatDto: CreateCatDto,
    @GetUser() user: UserEntity,
  ): Promise<CreateCatDto> {
    return this.catsService.createSer(createCatDto, user);
  }

  @Get()
  findAll(): Promise<CatEntity[]> {
    // throw new HttpException(
    //   {
    //     status: HttpStatus.FORBIDDEN,
    //     error: 'This is a custom message',
    //   },
    //   HttpStatus.FORBIDDEN,
    // );
    return this.catsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<CatEntity> {
    return this.catsService.findOne(id);
  }

  @Put(':id')
  update(
    @Body() updateCatDto: UpdateCatDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CatEntity> {
    return this.catsService.updateSer(id, updateCatDto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.catsService.deleteSer(id);
  }
}
