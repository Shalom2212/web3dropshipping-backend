import { Test, TestingModule } from '@nestjs/testing';
import { DeployInBlockchainController } from './deploy-in-blockchain.controller';
import { DeployInBlockchainService } from './deploy-in-blockchain.service';

describe('DeployInBlockchainController', () => {
  let controller: DeployInBlockchainController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeployInBlockchainController],
      providers: [DeployInBlockchainService],
    }).compile();

    controller = module.get<DeployInBlockchainController>(DeployInBlockchainController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
