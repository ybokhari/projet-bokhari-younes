import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'products-card',
  templateUrl: './products-card.component.html',
})
export class ProductsCardComponent {
  @Input() declare product: Product;
  @Output() productAdded = new EventEmitter();
}
