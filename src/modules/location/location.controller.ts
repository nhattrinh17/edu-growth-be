import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpException, HttpStatus } from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { ApiOperationCustom, Pagination, PaginationDto } from 'src/custom-decorator';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { ApiDocsPagination } from 'src/setup-swagger';
import { Public } from '../auth/decorators';

@ApiTags('Location')
@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  @ApiOperationCustom('Location', 'post')
  async create(@Body() createLocationDto: CreateLocationDto) {
    try {
      return await this.locationService.create(createLocationDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  @Public()
  @ApiOperationCustom('Location', 'get')
  findAll(@Pagination() pagination: PaginationDto, @Query('search') search) {
    return this.locationService.findAll(pagination, search);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.locationService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperationCustom('Location', 'patch')
  async update(@Param('id') id: string, @Body() updateLocationDto: UpdateLocationDto) {
    try {
      return await this.locationService.update(+id, updateLocationDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  @ApiOperationCustom('Location', 'delete')
  remove(@Param('id') id: string) {
    return this.locationService.remove(+id);
  }
}
