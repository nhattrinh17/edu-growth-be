import { Inject, Injectable } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { TutorReceiveClassDto, UpdateClassDto } from './dto/update-class.dto';
import { ClassRepositoryInterface } from './interface/class.interface';
import { SubjectService } from '../subject/subject.service';
import { EduLevelService } from '../edu-level/edu-level.service';
import { LocationService } from '../location/location.service';
import { StatusClass, messageResponse } from 'src/constants';
import { PaginationDto } from 'src/custom-decorator';
import { Op } from 'sequelize';
import { EduLevelModel, SubjectModel, UserModel } from 'src/models';
import { UsersService } from '../users/users.service';

@Injectable()
export class ClassService {
  constructor(
    @Inject('ClassRepositoryInterface')
    private readonly classRepository: ClassRepositoryInterface,
    private readonly subjectService: SubjectService,
    private readonly eduLevelService: EduLevelService,
    private readonly locationService: LocationService,
    private readonly usersService: UsersService,
  ) {}

  async create(dto: CreateClassDto) {
    if (!dto.locationNear || !dto.locationReal || !dto.parentNumber || !dto.price || !dto.numberSessions || !dto.receivingFee) throw new Error(messageResponse.system.missingData);
    const checkDataValid = await Promise.all([
      //
      this.subjectService.count({ id: dto.subjectId }),
      this.eduLevelService.count({ id: dto.eduLevelId }),
      this.locationService.count({ id: dto.locationId }),
    ]);

    if (checkDataValid.includes(0)) throw new Error(messageResponse.system.dataInvalid);
    console.log('🚀 ~ ClassService ~ create ~ dto:', dto);
    return this.classRepository.create(dto);
  }

  findAll(pagination: PaginationDto, subjectId: number[], eduLevelId: number[], require: number[], locationId: number[]) {
    const filter: any = {
      statusClass: StatusClass.stillEmpty,
    };
    if (subjectId) filter.subjectId = { [Op.in]: subjectId };
    if (eduLevelId) filter.eduLevelId = { [Op.in]: eduLevelId };
    if (require) filter.require = { [Op.in]: require };
    if (locationId) filter.locationId = { [Op.in]: locationId };
    return this.classRepository.findAll(filter, {
      ...pagination,
      projection: ['id', 'class', 'locationNear', 'price', 'numberSessions', 'require'],
      include: [
        {
          model: SubjectModel,
          as: 'subject',
          attributes: ['id', 'name'], // Chỉ lấy ra id, username và email từ bảng user
        },
      ],
    });
  }

  findAllCMS(pagination: PaginationDto, statusClass: number, subjectId: number[], eduLevelId: number[], require: number[], locationId: number[]) {
    const filter: any = {};
    if (statusClass >= 0) filter.statusClass = statusClass;
    if (subjectId) filter.subjectId = { [Op.in]: subjectId };
    if (eduLevelId) filter.eduLevelId = { [Op.in]: eduLevelId };
    if (require) filter.require = { [Op.in]: require };
    if (locationId) filter.locationId = { [Op.in]: locationId };
    return this.classRepository.findAll(filter, {
      ...pagination,
      projection: ['id', 'statusClass', 'class', 'parentNumber', 'price', 'genderStudent', 'receivingFee'],
      include: [
        {
          model: UserModel,
          as: 'userReceiver',
          attributes: ['id', 'username', 'email'], // Chỉ lấy ra id, username và email từ bảng user
        },
        {
          model: SubjectModel,
          as: 'subject',
          attributes: ['id', 'name'], // Chỉ lấy ra id, username và email từ bảng user
        },
        {
          model: EduLevelModel,
          as: 'eduLevel',
          attributes: ['id', 'name'], // Chỉ lấy ra id, username và email từ bảng user
        },
      ],
    });
  }

  findOne(id: number) {
    return this.classRepository.findOneById(id, ['id', 'statusClass', 'class', 'locationNear', 'price', 'numberSessions', 'require', 'timeLearn', 'genderStudent', 'studentStatus', 'moreInfoStudent', 'receivingFee'], {
      include: [
        {
          model: SubjectModel,
          as: 'subject',
          attributes: ['id', 'name'], // Chỉ lấy ra id, username và email từ bảng user
        },
      ],
    });
  }

  findOneForCMS(id: number) {
    return this.classRepository.findOneById(id, ['id', 'statusClass', 'class', 'locationNear', 'locationReal', 'subjectId', 'subjectId', 'eduLevelId', 'locationId', 'price', 'numberSessions', 'require', 'timeLearn', 'genderStudent', 'studentStatus', 'moreInfoStudent', 'receivingFee'], {
      include: [
        {
          model: UserModel,
          as: 'userReceiver',
          attributes: ['id', 'username', 'email'], // Chỉ lấy ra id, username và email từ bảng user
        },
        {
          model: SubjectModel,
          as: 'subject',
          attributes: ['id', 'name'], // Chỉ lấy ra id, username và email từ bảng user
        },
        {
          model: EduLevelModel,
          as: 'eduLevel',
          attributes: ['id', 'name'], // Chỉ lấy ra id, username và email từ bảng user
        },
      ],
    });
  }

  async update(id: number, dto: UpdateClassDto) {
    const classById = await this.classRepository.findOneById(id);
    if (!classById) throw new Error(messageResponse.system.notFound);
    if (classById.statusClass != StatusClass.stillEmpty) throw new Error(messageResponse.class.classHasReceive);
    return this.classRepository.findByIdAndUpdate(id, {
      class: dto.class,
      locationNear: dto.locationNear,
      locationReal: dto.locationReal,
      parentNumber: dto.parentNumber,
      price: dto.price,
      numberSessions: dto.numberSessions,
      require: dto.require,
      timeLearn: dto.timeLearn,
      genderStudent: dto.genderStudent,
      studentStatus: dto.studentStatus,
      moreInfoStudent: dto.moreInfoStudent,
    });
  }

  async tutorReceiveClass(id: number, dto: TutorReceiveClassDto) {
    const classById = await this.classRepository.findOneById(id);
    if (!classById) throw new Error(messageResponse.system.notFound);
    if (classById.statusClass != StatusClass.stillEmpty) throw new Error(messageResponse.class.classHasReceive);
    let userReceiver = await this.usersService.findOneByEmailOrUsername(dto.email);
    if (!userReceiver) {
      userReceiver = await this.usersService.create({ email: dto.email, name: dto.name, phone: dto.phone, password: new Date().getTime().toString(), username: dto.email.split('@')[0] });
    }
    return this.classRepository.findByIdAndUpdate(id, {
      userReceiverId: userReceiver.id,
      statusClass: StatusClass.received,
    });
  }

  async updateStatusClass(
    id: number,
    dto: {
      statusClass: number;
    },
  ) {
    const classById = await this.classRepository.findOneById(id);
    if (!classById) throw new Error(messageResponse.system.notFound);
    if (classById.statusClass == StatusClass.assignedClass) throw new Error(messageResponse.class.classHasReceive);
    return this.classRepository.findByIdAndUpdate(id, {
      statusClass: dto.statusClass,
      userReceiverId: null,
    });
  }

  async remove(id: number) {
    const classById = await this.classRepository.findOneById(id);
    if (!classById) throw new Error(messageResponse.system.notFound);
    if (classById.statusClass != StatusClass.stillEmpty) throw new Error(messageResponse.class.classHasReceive);
    return this.classRepository.permanentlyDelete(id);
  }
}
