import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BaseRepositoryAbstract } from 'src/base';
import { UserModel } from 'src/models';
import { UserRepositoryInterface } from '../interface/game-point.interface';
@Injectable()
export class UserRepository extends BaseRepositoryAbstract<UserModel> implements UserRepositoryInterface {
  constructor(@InjectModel(UserModel) private readonly userModel: typeof UserModel) {
    super(UserModel);
  }
}
