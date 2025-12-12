import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminAuthService } from 'src/app/services/admin-auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
isAdmin$: Observable<boolean>;

  constructor(private adminAuth: AdminAuthService) {
    this.isAdmin$ = this.adminAuth.isAdmin$;
  }
  logout() {
  this.adminAuth.logout();
}


  ngOnInit(): void {
  }

}
