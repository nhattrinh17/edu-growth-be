import { Inject, Injectable } from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { SubjectRepositoryInterface } from './interface/subject.interface';
import { generateSlug } from 'src/utils';
import { messageResponse } from 'src/constants';
import { PaginationDto } from 'src/custom-decorator';
import { Op } from 'sequelize';

@Injectable()
export class SubjectService {
  constructor(
    @Inject('SubjectRepositoryInterface')
    private readonly subjectRepository: SubjectRepositoryInterface,
  ) {}

  async create(dto: CreateSubjectDto) {
    if (!dto.name) throw new Error(messageResponse.system.missingData);
    const slug = generateSlug(dto.name);
    const checkExit = await this.subjectRepository.count({ slug: slug });
    if (checkExit) throw new Error(messageResponse.system.duplicateData);
    return this.subjectRepository.create({ ...dto, slug });
  }

  findAll(pagination: PaginationDto, search: string) {
    const filter: any = {};
    if (search) filter.name = { [Op.like]: search };
    return this.subjectRepository.findAll(filter, {
      ...pagination,
      projection: ['id', 'name', 'description', 'slug', 'createdAt'],
    });
  }

  findOne(id: number) {
    return this.subjectRepository.findOneById(id);
  }

  count(condition: object) {
    return this.subjectRepository.count(condition);
  }

  async remove(id: number) {
    const subject = await this.subjectRepository.count({ id: id });
    if (!subject) throw new Error(messageResponse.system.idInvalid);
    return this.subjectRepository.permanentlyDelete(id);
  }
}
