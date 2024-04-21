import { Test, TestingModule } from '@nestjs/testing';
import { TravelPackagesController } from './travel-packages.controller';
import { TravelPackagesService } from './travel-packages.service';

describe('TravelPackagesController', () => {
  let controller: TravelPackagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TravelPackagesController],
      providers: [TravelPackagesService],
    }).compile();

    controller = module.get<TravelPackagesController>(TravelPackagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
