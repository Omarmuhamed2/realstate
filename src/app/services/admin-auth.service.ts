import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthService {
  private isAdminSubject = new BehaviorSubject<boolean>(
    localStorage.getItem('isAdmin') === 'true'
  );
  isAdmin$ = this.isAdminSubject.asObservable();

  constructor() {}

  /** تحقق من الـ PIN */
  login(pin: string): boolean {
    if (pin === environment.adminPin) {
      localStorage.setItem('isAdmin', 'true');
      this.isAdminSubject.next(true);
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('isAdmin');
    this.isAdminSubject.next(false);
  }

  /** تستخدم في الـ Guard */
  get isAdmin(): boolean {
    return this.isAdminSubject.value;
  }
  
}
