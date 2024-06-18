import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-get-user',
  templateUrl: './get-user.component.html',
})
export class GetUserComponent {
  constructor(private authService: AuthService) {}

  user: any;

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.authService.getUser().subscribe({
      next: (user) => {
        this.user = JSON.stringify(user);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
