import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { EduLevelService } from './edu-level.service';
import { CreateEduLevelDto } from './dto/create-edu-level.dto';
import { UpdateEduLevelDto } from './dto/update-edu-level.dto';
import { BaseFilter, Pagination, PaginationDto } from 'src/custom-decorator';

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

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eduLevelService.remove(+id);
  }
}
