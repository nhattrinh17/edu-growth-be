import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ClassService } from './class.service';
import { CreateClassDto } from './dto/create-class.dto';
import { TutorReceiveClassDto, UpdateClassDto } from './dto/update-class.dto';
import { Public } from '../auth/decorators';
import { Pagination, PaginationDto } from 'src/custom-decorator';
import { ApiQuery } from '@nestjs/swagger';

@Controller('class')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Post()
  create(@Body() createClassDto: CreateClassDto) {
    return this.classService.create(createClassDto);
  }

  @Public()
  @Get()
  @ApiQuery({
    name: 'subjectId',
    type: [Number],
    description: 'Môn học',
  })
  @ApiQuery({
    name: 'eduLevelId',
    type: [Number],
    description: 'Cấp học',
  })
  @ApiQuery({
    name: 'require',
    type: [Number],
    description: 'Yêu cầu giảng viên',
  })
  @ApiQuery({
    name: 'locationId',
    type: [Number],
    description: 'Địa điểm',
  })
  findAll(
    //
    @Pagination() pagination: PaginationDto,
    @Query('subjectId') subjectId: number[],
    @Query('eduLevelId') eduLevelId: number[],
    @Query('require') require: number[],
    @Query('locationId') locationId: number[],
  ) {
    return this.classService.findAll(pagination, subjectId, eduLevelId, require, locationId);
  }

  @Public()
  @Get('cms')
  @ApiQuery({
    name: 'statusClass',
    type: Number,
    description: 'Trạng thái lớp',
  })
  @ApiQuery({
    name: 'subjectId',
    type: [Number],
    description: 'Môn học',
  })
  @ApiQuery({
    name: 'eduLevelId',
    type: [Number],
    description: 'Cấp học',
  })
  @ApiQuery({
    name: 'require',
    type: [Number],
    description: 'Yêu cầu giảng viên',
  })
  @ApiQuery({
    name: 'locationId',
    type: [Number],
    description: 'Địa điểm',
  })
  findAllCms(
    //
    @Pagination() pagination: PaginationDto,
    @Query('statusClass') statusClass: number,
    @Query('subjectId') subjectId: number[],
    @Query('eduLevelId') eduLevelId: number[],
    @Query('require') require: number[],
    @Query('locationId') locationId: number[],
  ) {
    return this.classService.findAllCMS(pagination, statusClass, subjectId, eduLevelId, require, locationId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.classService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClassDto: UpdateClassDto) {
    return this.classService.update(+id, updateClassDto);
  }

  @Patch(':id/receiver')
  tutorReceiveClass(@Param('id') id: string, @Body() dto: TutorReceiveClassDto) {
    return this.classService.tutorReceiveClass(+id, dto);
  }

  @Patch(':id/status')
  updateStatusClass(@Param('id') id: string, @Body() dto: { statusClass: number }) {
    return this.classService.updateStatusClass(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.classService.remove(+id);
  }
}
