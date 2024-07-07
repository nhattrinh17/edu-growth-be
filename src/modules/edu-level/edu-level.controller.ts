import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpStatus, HttpException } from '@nestjs/common';
import { EduLevelService } from './edu-level.service';
import { CreateEduLevelDto } from './dto/create-edu-level.dto';
import { UpdateEduLevelDto } from './dto/update-edu-level.dto';
import { BaseFilter, Pagination, PaginationDto } from 'src/custom-decorator';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Edu level')
@Controller('edu-level')
export class EduLevelController {
  constructor(private readonly eduLevelService: EduLevelService) {}

  @Post()
  create(@Body() createEduLevelDto: CreateEduLevelDto) {
    return this.eduLevelService.create(createEduLevelDto);
  }

  @Get()
  @BaseFilter()
  findAll(@Pagination() pagination: PaginationDto, @Query('search') search: string) {
    return this.eduLevelService.findAll(pagination, search);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eduLevelService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateEduLevelDto) {
    try {
      return await this.eduLevelService.update(+id, dto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eduLevelService.remove(+id);
  }
}
