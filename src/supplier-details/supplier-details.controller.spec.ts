import { Test, TestingModule } from '@nestjs/testing';
import { SupplierDetailsController } from './supplier-details.controller';
import { SupplierDetailsService } from './supplier-details.service';

describe('SupplierDetailsController', () => {
  let controller: SupplierDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SupplierDetailsController],
      providers: [SupplierDetailsService],
    }).compile();

    controller = module.get<SupplierDetailsController>(SupplierDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
