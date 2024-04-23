import { PartialType } from '@nestjs/mapped-types';
import { CreateDeployInBlockchainDto } from './create-deploy-in-blockchain.dto';

export class UpdateDeployInBlockchainDto extends PartialType(CreateDeployInBlockchainDto) {}
