import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'products-list',
  templateUrl: './products-list.component.html',
})
export class ProductsListComponent {
  @Input() declare products: Product[] | null;
  @Output() productAdded = new EventEmitter();
  @Output() productSearched = new EventEmitter();
  searchProduct: FormControl = new FormControl('');
  term = new FormControl('');

  filtersProducts() {
    this.productSearched.emit(this.term.value);
  }
}
