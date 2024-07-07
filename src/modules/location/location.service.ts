import { Inject, Injectable } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { LocationRepositoryInterface } from './interface/location.interface';
import { messageResponse } from 'src/constants';
import { generateSlug } from 'src/utils';
import { PaginationDto } from 'src/custom-decorator';
import { Op } from 'sequelize';

@Injectable()
export class LocationService {
  constructor(
    @Inject('LocationRepositoryInterface')
    private readonly locationRepository: LocationRepositoryInterface,
  ) {}

  async create(dto: CreateLocationDto) {
    if (!dto.district || !dto.province) throw new Error(messageResponse.system.missingData);
    const slug = generateSlug(`${dto.district} ${dto.province}`);
    const checkExit = await this.locationRepository.count({ slug });
    if (checkExit) throw new Error(messageResponse.system.duplicateData);
    return this.locationRepository.create({ ...dto, slug });
  }

  findAll(pagination: PaginationDto, search: string) {
    const filter: any = {};
    if (search) filter.province = { [Op.like]: search };
    return this.locationRepository.findAll(filter, {
      ...pagination,
      projection: ['id', 'province', 'district', 'createdAt'],
    });
  }

  findOne(id: number) {
    return this.locationRepository.findOneById(id);
  }

  async update(id: number, dto: UpdateLocationDto) {
    const locationById = await this.findOne(id);
    if (!locationById) throw new Error(messageResponse.system.idInvalid);
    const slug = generateSlug(`${dto.district} ${dto.province}`);
    const checkExit = await this.locationRepository.count({ slug, id: { [Op.ne]: id } });
    if (checkExit) throw new Error(messageResponse.system.duplicateData);
    return this.locationRepository.findByIdAndUpdate(id, { ...dto, slug });
  }

  count(condition: object) {
    return this.locationRepository.count(condition);
  }

  async remove(id: number) {
    const location = await this.locationRepository.count({ id: id });
    if (!location) throw new Error(messageResponse.system.idInvalid);
    return this.locationRepository.permanentlyDelete(id);
  }
}
