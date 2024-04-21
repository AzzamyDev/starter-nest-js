import { Module } from '@nestjs/common';
import { TravelsService } from './travels.service';
import { TravelsController } from './travels.controller';
import { TravelPackagesModule } from './travel-packages/travel-packages.module';
import { SchedulesModule } from './schedules/schedules.module';

@Module({
  controllers: [TravelsController],
  providers: [TravelsService],
  imports: [TravelPackagesModule, SchedulesModule],
})
export class TravelsModule {}
