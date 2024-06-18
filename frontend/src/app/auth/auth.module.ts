import { NgModule } from '@angular/core';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { provideHttpClient } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { GetUserComponent } from './pages/get-user/get-user.component';

@NgModule({
  declarations: [SignInComponent, SignUpComponent, GetUserComponent],
  imports: [SharedModule, RouterModule],
  providers: [provideHttpClient()],
})
export class AuthModule {}
