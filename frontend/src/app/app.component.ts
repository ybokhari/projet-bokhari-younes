import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { EventBusService } from './shared/services/event-bus.service';
import { StorageService } from './auth/services/storage.service';
import { AuthService } from './auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'Taslim Baby';
  eventBusSub?: Subscription;

  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private eventBusService: EventBusService,
    private router: Router
  ) {}

  ngOnInit() {
    this.eventBusSub = this.eventBusService.on('sign-out', () => {
      this.signOut();
    });
  }

  signOut(): void {
    this.authService.signOut(this.storageService.getUser().id).subscribe({
      next: () => {
        this.storageService.clean();
        this.router.navigate(['/sign-in']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
