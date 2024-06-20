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

  refresh$ = new BehaviorSubject(null);
  products$ = this.refresh$.pipe(
    switchMap(() => this.productsService.getProducts())
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

  refresh() {
    this.refresh$.next(null);
  }
  filtersProducts() {
    this.refresh();
    if (!this.products$) return;
    this.products$ = this.products$?.filter((product) =>
      product.name
        .toLowerCase()
        .includes(this.searchProduct.value.toLowerCase())
    );
  }
}
