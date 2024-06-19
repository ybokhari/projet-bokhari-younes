import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'is-authenticated',
  templateUrl: './is-authenticated.component.html',
})
export class IsAuthenticatedComponent {
  constructor(private authService: AuthService) {}

  isAuthenticatedVar: any;

  ngOnInit(): void {
    this.isAuthenticated();
  }

  isAuthenticated() {
    this.authService.isAuthenticated().subscribe({
      next: (isAuthenticated) => {
        this.isAuthenticatedVar = isAuthenticated;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
