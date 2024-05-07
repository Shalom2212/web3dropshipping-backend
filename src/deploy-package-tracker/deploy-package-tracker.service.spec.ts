import { Test, TestingModule } from '@nestjs/testing';
import { DeployPackageTrackerService } from './deploy-package-tracker.service';

describe('DeployPackageTrackerService', () => {
  let service: DeployPackageTrackerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeployPackageTrackerService],
    }).compile();

    service = module.get<DeployPackageTrackerService>(DeployPackageTrackerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
