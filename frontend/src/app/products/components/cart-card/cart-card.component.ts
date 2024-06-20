import { Component, Input } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'cart-card',
  templateUrl: './cart-card.component.html',
})
export class CartCardComponent {
  @Input() declare productAdded: Product;
}
