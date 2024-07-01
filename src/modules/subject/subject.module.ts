import { Module } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { SubjectController } from './subject.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { SubjectModel } from 'src/models';
import { SubjectRepository } from './repository/subject.repository';

@Module({
  imports: [SequelizeModule.forFeature([SubjectModel])],
  controllers: [SubjectController],
  providers: [
    SubjectService,
    {
      provide: 'SubjectRepositoryInterface',
      useClass: SubjectRepository,
    },
  ],
  exports: [
    SubjectService,
    {
      provide: 'SubjectRepositoryInterface',
      useClass: SubjectRepository,
    },
  ],
})
export class SubjectModule {}
