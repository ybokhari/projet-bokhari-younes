import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './auth/pages/sign-in/sign-in.component';
import { SignUpComponent } from './auth/pages/sign-up/sign-up.component';
import { IsAuthenticatedComponent } from './auth/pages/is-authenticated/is-authenticated.component';
import { ProductsPageComponent } from './products/pages/products-page/products-page.component';
import { isAuthenticatedGuard } from './auth/guards/is-authenticated.guard';
import { SignOutComponent } from './auth/components/sign-out/sign-out.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full',
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
  },
  {
    path: 'sign-in',
    component: SignInComponent,
  },
  {
    path: 'sign-out',
    component: SignOutComponent,
  },
  {
    path: 'is-authenticated',
    component: IsAuthenticatedComponent,
  },
  {
    path: 'products',
    component: ProductsPageComponent,
    canActivate: [isAuthenticatedGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
