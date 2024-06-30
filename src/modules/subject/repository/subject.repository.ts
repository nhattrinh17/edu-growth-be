import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BaseRepositoryAbstract } from 'src/base';
import { SubjectModel } from 'src/models';
import { SubjectRepositoryInterface } from '../interface/subject.interface';
@Injectable()
export class SubjectRepository extends BaseRepositoryAbstract<SubjectModel> implements SubjectRepositoryInterface {
  constructor(@InjectModel(SubjectModel) private readonly subjectModel: typeof SubjectModel) {
    super(SubjectModel);
  }
}
