import { Test, TestingModule } from '@nestjs/testing';
import { DeployInBlockchainService } from './deploy-in-blockchain.service';

describe('DeployInBlockchainService', () => {
  let service: DeployInBlockchainService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeployInBlockchainService],
    }).compile();

    service = module.get<DeployInBlockchainService>(DeployInBlockchainService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
