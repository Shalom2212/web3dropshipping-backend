import { Module } from '@nestjs/common';
import { DeployInBlockchainService } from './deploy-in-blockchain.service';
import { DeployInBlockchainController } from './deploy-in-blockchain.controller';

@Module({
  controllers: [DeployInBlockchainController],
  providers: [DeployInBlockchainService],
})
export class DeployInBlockchainModule {}
