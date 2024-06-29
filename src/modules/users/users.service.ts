import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepositoryInterface } from './interface/game-point.interface';
import { Op } from 'sequelize';
import { messageResponse } from 'src/constants';
import { Helper } from 'src/utils';

@Injectable()
export class UsersService {
  constructor(
    @Inject('UserRepositoryInterface')
    private readonly userRepository: UserRepositoryInterface,
    private readonly helper: Helper,
  ) {}

  async create(dto: CreateUserDto, checkCode?: boolean) {
    dto.username = dto.username.trim().toLowerCase();
    if (+dto.phone.split('')[0] == 0) dto.phone = dto.phone.slice(1);
    // if (checkCode) {
    //   const keyRedis = `create-account:code:${dto.phone}`;
    //   const codeRedis = await this.cacheService.get(keyRedis);
    //   if (codeRedis != dto.code) throw new Error('code_wrong');
    // }
    const checkDuplicate = await this.userRepository.findOneByCondition({
      [Op.or]: [{ username: dto.username }, { phone: dto.phone }],
    });
    if (checkDuplicate) throw new Error(messageResponse.user.userExists);
    if (!dto.password) throw new Error(messageResponse.system.missingData);
    const password = String(dto.password).trim();
    dto.password = await this.helper.hashString(password);
    return this.userRepository.create({ ...dto });
  }

  // async findAll(pagination: Pagination, search: string, status: string, phone: string, sort?: any) {
  //   const filter: any = {};
  //   if (search) filter[Op.or] = [{ username: { [Op.like]: `%${search.trim()}%` } }, { name: { [Op.like]: `%${search.trim()}%` } }];
  //   if (status) filter.status = status;
  //   if (phone) filter.phone = { [Op.like]: `%${phone.trim()}%` };
  //   const promise1 = this.userModel.count({ where: filter });
  //   const promise2 = this.userModel.findAll({
  //     //
  //     where: filter,
  //     order: [sort ? [sort, 'DESC'] : ['id', 'DESC']],
  //     offset: pagination.offset,
  //     limit: pagination.limit,
  //     attributes: ['id', 'username', 'name', 'phone', 'status', 'typeUser', 'createdAt'],
  //   });
  //   const [countDocument, data] = await Promise.all([promise1, promise2]);
  //   return {
  //     pagination: { limit: pagination.limit, page: pagination.page, total: countDocument },
  //     data,
  //   };
  // }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
