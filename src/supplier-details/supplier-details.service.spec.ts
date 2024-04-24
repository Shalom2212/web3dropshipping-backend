import { Test, TestingModule } from '@nestjs/testing';
import { SupplierDetailsService } from './supplier-details.service';

describe('SupplierDetailsService', () => {
  let service: SupplierDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SupplierDetailsService],
    }).compile();

    service = module.get<SupplierDetailsService>(SupplierDetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
