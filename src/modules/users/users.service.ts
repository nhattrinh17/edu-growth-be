import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepositoryInterface } from './interface/users.interface';
import { Op } from 'sequelize';
import { messageResponse } from 'src/constants';
import { Helper } from 'src/utils';
import { PaginationDto } from 'src/custom-decorator';

@Injectable()
export class UsersService {
  constructor(
    @Inject('UserRepositoryInterface')
    private readonly userRepository: UserRepositoryInterface,
    private readonly helper: Helper,
  ) {}

  async create(dto: CreateUserDto) {
    dto.username = dto.username.trim().toLowerCase();
    if (+dto.phone.split('')[0] == 0) dto.phone = dto.phone.slice(1);

    const checkDuplicate = await this.userRepository.findOneByCondition({
      [Op.or]: [{ username: dto.username }, { phone: dto.phone }],
    });
    if (checkDuplicate) throw new Error(messageResponse.user.userExists);
    if (!dto.password) throw new Error(messageResponse.system.missingData);
    const password = String(dto.password).trim();
    dto.password = await this.helper.hashString(password);
    return this.userRepository.create({ ...dto });
  }

  async findAll(pagination: PaginationDto, search: string, status: string, phone: string, sort?: any) {
    const filter: any = {};
    if (search) filter[Op.or] = [{ username: { [Op.like]: `%${search.trim()}%` } }, { name: { [Op.like]: `%${search.trim()}%` } }];
    if (status) filter.status = status;
    if (phone) filter.phone = { [Op.like]: `%${phone.trim()}%` };

    console.log('🚀 ~ UsersService ~ findAll ~ filter:', filter);
    return this.userRepository.findAll(
      //
      filter,
      {
        sort,
        ...pagination,
        projection: ['id', 'email', 'username', 'name', 'phone', 'status', 'typeUser', 'createdAt'],
      },
    );
  }

  findOne(id: number) {
    return this.userRepository.findOneById(id, ['id', 'email', 'username', 'name', 'phone', 'status', 'avatar']);
  }

  findOneByEmailOrUsername(account: string) {
    return this.userRepository.findOneByCondition({
      [Op.or]: [{ username: account.toLocaleUpperCase() }, { email: account }],
    });
  }

  async remove(id: number) {
    const checkUserExit = await this.userRepository.count({ id: id });
    if (checkUserExit) {
      return this.userRepository.softDelete(id);
    }
    throw new Error(messageResponse.user.userDoseNotExists);
  }
}
