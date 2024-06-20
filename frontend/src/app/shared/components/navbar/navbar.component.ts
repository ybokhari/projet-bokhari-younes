import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { StorageService } from '../../../auth/services/storage.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  isAuthenticated$ = this.authService.isAuthenticated();

  ngOnInit() {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.isAuthenticated$ = this.authService.isAuthenticated();
      }
    });
  }

  closeDropdown() {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }
}
