import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsCardComponent } from './components/products-card/products-card.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { ProductsService } from './services/products.service';
import { AddToCartBtnComponent } from './components/add-to-cart-btn/add-to-cart-btn.component';
import { CartCardComponent } from './components/cart-card/cart-card.component';
import { CartListComponent } from './components/cart-list/cart-list.component';

@NgModule({
  declarations: [
    ProductsCardComponent,
    ProductsListComponent,
    ProductsPageComponent,
    AddToCartBtnComponent,
    CartCardComponent,
    CartListComponent,
  ],
  providers: [ProductsService],
  imports: [CommonModule],
})
export class ProductsModule {}
