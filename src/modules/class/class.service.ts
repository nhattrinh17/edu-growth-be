import { Inject, Injectable } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { ClassRepositoryInterface } from './interface/class.interface';
import { SubjectService } from '../subject/subject.service';
import { EduLevelService } from '../edu-level/edu-level.service';
import { LocationService } from '../location/location.service';

@Injectable()
export class ClassService {
  constructor(
    @Inject('ClassRepositoryInterface')
    private readonly classRepository: ClassRepositoryInterface,
    private readonly subjectService: SubjectService,
    private readonly eduLevelService: EduLevelService,
    private readonly locationService: LocationService,
  ) {}

  create(createClassDto: CreateClassDto) {
    return 'This action adds a new class';
  }

  findAll() {
    return `This action returns all class`;
  }

  findOne(id: number) {
    return `This action returns a #${id} class`;
  }

  update(id: number, updateClassDto: UpdateClassDto) {
    return `This action updates a #${id} class`;
  }

  remove(id: number) {
    return `This action removes a #${id} class`;
  }
}
