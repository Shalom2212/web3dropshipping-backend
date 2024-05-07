import { Module } from '@nestjs/common';
import { DeployPackageTrackerService } from './deploy-package-tracker.service';
import { DeployPackageTrackerController } from './deploy-package-tracker.controller';

@Module({
  controllers: [DeployPackageTrackerController],
  providers: [DeployPackageTrackerService],
})
export class DeployPackageTrackerModule {}
