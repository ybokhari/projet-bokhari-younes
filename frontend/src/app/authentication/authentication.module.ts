import { NgModule } from '@angular/core';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { SignUpComponent } from './pages/sign-up/sign-up/sign-up.component';
import { provideHttpClient } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { AuthenticationService } from './services/authentication.service';

@NgModule({
  declarations: [SignInComponent, SignUpComponent],
  imports: [SharedModule, AuthenticationRoutingModule],
  providers: [AuthenticationService, provideHttpClient()],
})
export class AuthenticationModule {}
