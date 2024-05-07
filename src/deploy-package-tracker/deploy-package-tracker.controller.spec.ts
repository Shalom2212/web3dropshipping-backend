import { Test, TestingModule } from '@nestjs/testing';
import { DeployPackageTrackerController } from './deploy-package-tracker.controller';
import { DeployPackageTrackerService } from './deploy-package-tracker.service';

describe('DeployPackageTrackerController', () => {
  let controller: DeployPackageTrackerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeployPackageTrackerController],
      providers: [DeployPackageTrackerService],
    }).compile();

    controller = module.get<DeployPackageTrackerController>(DeployPackageTrackerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
