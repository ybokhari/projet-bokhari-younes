import { Component, Input } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'cart-list',
  templateUrl: './cart-list.component.html',
})
export class CartListComponent {
  @Input() declare productsAdded: Product[] | null;

  reload() {
    location.reload();
  }

  calculatePrice() {
    return this.productsAdded?.reduce(
      (acc, product) => acc + product.price,
      0
    );
  }
}
