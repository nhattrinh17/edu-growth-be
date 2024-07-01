import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BaseRepositoryAbstract } from 'src/base';
import { LocationModel } from 'src/models';
import { LocationRepositoryInterface } from '../interface/location.interface';
@Injectable()
export class LocationRepository extends BaseRepositoryAbstract<LocationModel> implements LocationRepositoryInterface {
  constructor(@InjectModel(LocationModel) private readonly locationModel: typeof LocationModel) {
    super(LocationModel);
  }
}
