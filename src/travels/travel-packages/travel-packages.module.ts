import { Module } from '@nestjs/common';
import { TravelPackagesService } from './travel-packages.service';
import { TravelPackagesController } from './travel-packages.controller';

@Module({
  controllers: [TravelPackagesController],
  providers: [TravelPackagesService],
})
export class TravelPackagesModule {}
