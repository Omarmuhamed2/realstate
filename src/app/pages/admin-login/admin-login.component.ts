import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminAuthService } from 'src/app/services/admin-auth.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  pin = '';
  error = '';

  constructor(private auth: AdminAuthService, private router: Router,private location: Location) {}

  onSubmit() {
    if (this.auth.login(this.pin.trim())) {
      this.router.navigate(['/admin']);
    } else {
      this.error = 'كلمة المرور غير صحيحة ❌';
    }
  }
  goBack() {
  this.location.back();
}
  
}
