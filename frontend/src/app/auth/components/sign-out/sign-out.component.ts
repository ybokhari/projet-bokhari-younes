import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.component.html',
})
export class SignOutComponent {
  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router
  ) {
    this.authService.signOut(this.storageService.getUser().id).subscribe(() => {
      this.router.navigate(['/sign-in']);
    });
  }
}
