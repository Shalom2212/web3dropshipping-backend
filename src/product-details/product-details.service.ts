import { Injectable } from '@nestjs/common';
import { CreateProductDetailDto } from './dto/create-product-detail.dto';
import { UpdateProductDetailDto } from './dto/update-product-detail.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProductDetailsService {
  constructor(private prisma: PrismaService) {}
  async create(createProductDetailDto: CreateProductDetailDto) {
    return await this.prisma.productsData.create({
      data: createProductDetailDto,
    });
  }

  findAll() {
    return this.prisma.productsData.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} productDetail`;
  }

  update(id: number, updateProductDetailDto: UpdateProductDetailDto) {
    return `This action updates a #${id} productDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} productDetail`;
  }
}
