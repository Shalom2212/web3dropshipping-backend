import { PartialType } from '@nestjs/mapped-types';
import { CreateDeployPackageTrackerDto } from './create-deploy-package-tracker.dto';

export class UpdateDeployPackageTrackerDto extends PartialType(CreateDeployPackageTrackerDto) {}
