import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SupplierDetailsService } from './supplier-details.service';
import { CreateSupplierDetailDto } from './dto/create-supplier-detail.dto';
import { UpdateSupplierDetailDto } from './dto/update-supplier-detail.dto';

@Controller('supplier-details')
export class SupplierDetailsController {
  constructor(private readonly supplierDetailsService: SupplierDetailsService) {}

  @Post()
  create(@Body() createSupplierDetailDto: CreateSupplierDetailDto) {
    return this.supplierDetailsService.create(createSupplierDetailDto);
  }

  @Get()
  findAll() {
    return this.supplierDetailsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.supplierDetailsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSupplierDetailDto: UpdateSupplierDetailDto) {
    return this.supplierDetailsService.update(+id, updateSupplierDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.supplierDetailsService.remove(+id);
  }
}
