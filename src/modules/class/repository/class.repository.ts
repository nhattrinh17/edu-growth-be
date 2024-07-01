import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BaseRepositoryAbstract } from 'src/base';
import { ClassModel } from 'src/models';
import { ClassRepositoryInterface } from '../interface/class.interface';
@Injectable()
export class ClassRepository extends BaseRepositoryAbstract<ClassModel> implements ClassRepositoryInterface {
  constructor(@InjectModel(ClassModel) private readonly classModel: typeof ClassModel) {
    super(ClassModel);
  }
}
