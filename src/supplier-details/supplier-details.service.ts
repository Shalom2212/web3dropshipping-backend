import { Injectable } from '@nestjs/common';
import { CreateSupplierDetailDto } from './dto/create-supplier-detail.dto';
import { UpdateSupplierDetailDto } from './dto/update-supplier-detail.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SupplierDetailsService {
  constructor(private prisma: PrismaService) {}
  async create(createSupplierDetailDto: CreateSupplierDetailDto) {
    const {
      productName,
      supplierName,
      supplierWalletAddress,
      MaxContractPeriod,
      supplierPercentage,
      totalNumberOfProduct,
    } = createSupplierDetailDto;

    return await this.prisma.supplierData.create({
      data: {
        productName,
        supplierName,
        supplierWalletAddress,
        MaxContractPeriod,
        supplierPercentage,
        totalNumberOfProduct,
      },
    });
  }

  async findAll() {
    return await this.prisma.supplierData.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} supplierDetail`;
  }

  update(id: number, updateSupplierDetailDto: UpdateSupplierDetailDto) {
    return `This action updates a #${id} supplierDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} supplierDetail`;
  }
}
