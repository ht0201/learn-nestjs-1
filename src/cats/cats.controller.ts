import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  create(@Body() createCatDto: CreateCatDto): Promise<CreateCatDto> {
    return this.catsService.create(createCatDto);
  }

  @Get()
  findAll(): Promise<CreateCatDto[]> {
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
  async findOne(@Param('id') id): Promise<CreateCatDto> {
    return this.catsService.findOne(id);
  }

  @Put(':id')
  update(
    @Body() updateCatDto: UpdateCatDto,
    @Param('id') id: string,
  ): Promise<UpdateCatDto> {
    return this.catsService.update(id, updateCatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.catsService.delete(id);
  }
}
