import { Module } from '@nestjs/common';
import { EduLevelService } from './edu-level.service';
import { EduLevelController } from './edu-level.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { EduLevelModel } from 'src/models';
import { EduLevelRepository } from './repository/edu-level.repository';

@Module({
  imports: [SequelizeModule.forFeature([EduLevelModel])],
  controllers: [EduLevelController],
  providers: [
    EduLevelService,
    {
      provide: 'EduLevelRepositoryInterface',
      useClass: EduLevelRepository,
    },
  ],
  exports: [
    EduLevelService,
    {
      provide: 'EduLevelRepositoryInterface',
      useClass: EduLevelRepository,
    },
  ],
})
export class EduLevelModule {}
