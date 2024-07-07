import { Inject, Injectable } from '@nestjs/common';
import { CreateEduLevelDto } from './dto/create-edu-level.dto';
import { UpdateEduLevelDto } from './dto/update-edu-level.dto';
import { EduLevelRepositoryInterface } from './interface/edu-level.interface';
import { messageResponse } from 'src/constants';
import { generateSlug } from 'src/utils';
import { PaginationDto } from 'src/custom-decorator';
import { Op } from 'sequelize';

@Injectable()
export class EduLevelService {
  constructor(
    @Inject('EduLevelRepositoryInterface')
    private readonly eduLevelRepository: EduLevelRepositoryInterface,
  ) {}

  async create(dto: CreateEduLevelDto) {
    if (!dto.name) throw new Error(messageResponse.system.missingData);
    const slug = generateSlug(dto.name);
    const checkExit = await this.eduLevelRepository.count({ slug });
    if (checkExit) throw new Error(messageResponse.system.duplicateData);
    return this.eduLevelRepository.create({ ...dto, slug });
  }

  findAll(pagination: PaginationDto, search: string) {
    const filter: any = {};
    if (search) filter.name = { [Op.like]: search };
    return this.eduLevelRepository.findAll(filter, {
      ...pagination,
      projection: ['id', 'name', 'description', 'createdAt'],
    });
  }

  findOne(id: number) {
    return this.eduLevelRepository.findOneById(id);
  }

  count(condition: object) {
    return this.eduLevelRepository.count(condition);
  }

  async update(id: number, dto: UpdateEduLevelDto) {
    const locationById = await this.findOne(id);
    if (!locationById) throw new Error(messageResponse.system.idInvalid);
    const slug = generateSlug(dto.name);
    const checkExit = await this.eduLevelRepository.count({ slug, id: { [Op.ne]: id } });
    if (checkExit) throw new Error(messageResponse.system.duplicateData);
    return this.eduLevelRepository.findByIdAndUpdate(id, { ...dto, slug });
  }

  async remove(id: number) {
    const eduLevel = await this.eduLevelRepository.count({ id: id });
    if (!eduLevel) throw new Error(messageResponse.system.idInvalid);
    return this.eduLevelRepository.permanentlyDelete(id);
  }
}
