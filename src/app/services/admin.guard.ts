import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  UrlTree,
} from '@angular/router';
import { AdminAuthService } from './admin-auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private adminAuth: AdminAuthService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    if (this.adminAuth.isAdmin) {
      return true;
    }
    // لو مش Admin → ودّيه على صفحة login
    return this.router.parseUrl('/admin-login');
  }
}
