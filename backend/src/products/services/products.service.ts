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

  async initializeProducts(): Promise<void> {
    const productsToCreate = [
      {
        name: 'Babynest',
        description:
          'Le babynest pour bébés offre un cocon douillet et sécurisé en coton hypoallergénique. Idéal pour le sommeil et les siestes, il procure confort et soutien. Facile à transporter et à nettoyer.',
        price: 50,
      },
      {
        name: 'Doudou lapin',
        description:
          'Le doudou lapin, en peluche douce et hypoallergénique, rassure et apaise bébé. Facile à saisir avec ses longues oreilles, il est lavable en machine et parfait pour accompagner bébé partout.',
        price: 20,
      },
      {
        name: 'Doudou renard',
        description:
          'Le doudou renard, en peluche douce et hypoallergénique, rassure et apaise bébé. Facile à saisir avec ses petites pattes, il est lavable en machine et parfait pour accompagner bébé partout.',
        price: 19,
      },
    ];

    for (const productToCreate of productsToCreate) {
      const existingProduct = await this.productRepository.findOne({
        where: {
          name: productToCreate.name,
        },
      });

      if (!existingProduct) {
        const product = this.productRepository.create(productToCreate);
        await this.productRepository.save(product);
      }
    }
  }

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
