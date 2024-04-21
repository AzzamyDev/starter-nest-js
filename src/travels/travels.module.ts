import { Module } from '@nestjs/common';
import { TravelsService } from './travels.service';
import { TravelsController } from './travels.controller';
import { TravelPackagesModule } from './travel-packages/travel-packages.module';

@Module({
  controllers: [TravelsController],
  providers: [TravelsService],
  imports: [TravelPackagesModule],
})
export class TravelsModule {}
