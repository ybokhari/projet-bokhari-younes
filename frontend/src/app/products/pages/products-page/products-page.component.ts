import { Component } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { BehaviorSubject, switchMap } from 'rxjs';
import { Product } from '../../models/product';

@Component({
  selector: 'products-page',
  templateUrl: './products-page.component.html',
})
export class ProductsPageComponent {
  constructor(private productsService: ProductsService) {}

  searchTerm$ = new BehaviorSubject('');
  products$ = this.searchTerm$.pipe(
    switchMap((searchTerm) => this.productsService.getProducts(searchTerm))
  );
  productsAdded: Product[] = [];

  addToCart(product: Product) {
    if (!product.isAdded) {
      this.productsAdded = this.productsAdded.filter(
        (p) => p.id !== product.id
      );
    } else {
      this.productsAdded.push(product);
    }
  }

  refresh(searchTerm: string) {
    this.searchTerm$.next(searchTerm);
  }
}
