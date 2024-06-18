import { Controller, Get, UseGuards } from '@nestjs/common';
import JwtAuthenticationGuard from 'src/auth/guards/jwt-authentication.guard';
import { ProductsService } from 'src/products/services/products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  findAll() {
    return this.productsService.findAll();
  }
}
