import { Module } from '@nestjs/common';
import { ClassService } from './class.service';
import { ClassController } from './class.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ClassModel } from 'src/models';
import { SubjectModule } from '../subject/subject.module';
import { EduLevelModule } from '../edu-level/edu-level.module';
import { EduLevelService } from '../edu-level/edu-level.service';
import { SubjectService } from '../subject/subject.service';
import { LocationModule } from '../location/location.module';
import { LocationService } from '../location/location.service';
import { ClassRepository } from './repository/class.repository';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { Helper } from 'src/utils';

@Module({
  imports: [
    //
    SequelizeModule.forFeature([ClassModel]),
    SubjectModule,
    EduLevelModule,
    LocationModule,
    UsersModule,
  ],
  controllers: [ClassController],
  providers: [
    //
    {
      provide: 'ClassRepositoryInterface',
      useClass: ClassRepository,
    },
    ClassService,
    EduLevelService,
    EduLevelService,
    SubjectService,
    LocationService,
    UsersService,
    Helper,
  ],
})
export class ClassModule {}
