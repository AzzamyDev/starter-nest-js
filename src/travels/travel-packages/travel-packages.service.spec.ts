import { Test, TestingModule } from '@nestjs/testing';
import { TravelPackagesService } from './travel-packages.service';

describe('TravelPackagesService', () => {
  let service: TravelPackagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TravelPackagesService],
    }).compile();

    service = module.get<TravelPackagesService>(TravelPackagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
