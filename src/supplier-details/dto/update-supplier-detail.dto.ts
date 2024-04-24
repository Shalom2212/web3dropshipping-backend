import { PartialType } from '@nestjs/mapped-types';
import { CreateSupplierDetailDto } from './create-supplier-detail.dto';

export class UpdateSupplierDetailDto extends PartialType(CreateSupplierDetailDto) {}
