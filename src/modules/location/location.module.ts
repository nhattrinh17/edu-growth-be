import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { LocationModel } from 'src/models';
import { LocationRepository } from './repository/location.repository';

@Module({
  imports: [SequelizeModule.forFeature([LocationModel])],
  controllers: [LocationController],
  providers: [
    LocationService,
    {
      provide: 'LocationRepositoryInterface',
      useClass: LocationRepository,
    },
  ],
  exports: [
    LocationService,
    {
      provide: 'LocationRepositoryInterface',
      useClass: LocationRepository,
    },
  ],
})
export class LocationModule {}
