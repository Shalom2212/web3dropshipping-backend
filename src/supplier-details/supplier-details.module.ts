import { Module } from '@nestjs/common';
import { SupplierDetailsService } from './supplier-details.service';
import { SupplierDetailsController } from './supplier-details.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [SupplierDetailsController],
  providers: [SupplierDetailsService, PrismaService],
})
export class SupplierDetailsModule {}
