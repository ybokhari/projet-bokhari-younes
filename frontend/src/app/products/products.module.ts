import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsCardComponent } from './components/products-card/products-card.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { ProductsService } from './services/products.service';



@NgModule({
  declarations: [
    ProductsCardComponent,
    ProductsListComponent,
    ProductsPageComponent
  ],
  providers: [ProductsService],
  imports: [
    CommonModule
  ]
})
export class ProductsModule { }
