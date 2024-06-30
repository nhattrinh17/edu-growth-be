import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BaseRepositoryAbstract } from 'src/base';
import { EduLevelModel } from 'src/models';
import { EduLevelRepositoryInterface } from '../interface/edu-level.interface';
@Injectable()
export class EduLevelRepository extends BaseRepositoryAbstract<EduLevelModel> implements EduLevelRepositoryInterface {
  constructor(@InjectModel(EduLevelModel) private readonly eduLevelModel: typeof EduLevelModel) {
    super(EduLevelModel);
  }
}
