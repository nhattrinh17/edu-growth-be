import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { BaseFilter, Pagination, PaginationDto } from 'src/custom-decorator';

@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Post()
  create(@Body() createSubjectDto: CreateSubjectDto) {
    return this.subjectService.create(createSubjectDto);
  }

  @Get()
  @BaseFilter()
  findAll(@Pagination() pagination: PaginationDto, @Query('search') search: string) {
    return this.subjectService.findAll(pagination, search);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subjectService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subjectService.remove(+id);
  }
}
