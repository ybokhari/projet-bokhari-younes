import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findAll(searchTerm?: string): Promise<Product[]> {
    if (searchTerm) {
      return await this.productRepository
        .createQueryBuilder('product')
        .where('product.name LIKE :searchTerm', {
          searchTerm: `%${searchTerm}%`,
        })
        .getMany();
    } else {
      return await this.productRepository.find();
    }
  }
}
