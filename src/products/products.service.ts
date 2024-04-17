import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prismaService: PrismaService) {

  }
  async create(createProductDto: CreateProductDto) {

    return this.prismaService.product.create({
      data: createProductDto
    })
  }

  async findAll() {
    return this.prismaService.product.findMany()
  }

  async findOne(id: number) {
    return this.prismaService.product.findUnique({
      where: {
        id
      }
    })
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    return this.prismaService.product.update({
      where: {
        id
      },
      data: updateProductDto
    })
  }

  async remove(id: number) {
    await this.prismaService.product.findUnique({
      where: {
        id
      }
    })

    return 'Data deleted'
  }
}
