import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'add-to-cart-btn',
  templateUrl: './add-to-cart-btn.component.html',
})
export class AddToCartBtnComponent {
  @Input() declare product: Product;
  @Output() productAdded = new EventEmitter<Product>();

  ngOnInit() {
    this.product.isAdded = false;
  }

  toggleProduct() {
    this.product.isAdded = !this.product.isAdded;
    this.productAdded.emit(this.product);
  }
}
