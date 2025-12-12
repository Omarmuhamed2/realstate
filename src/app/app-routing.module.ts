import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CategoryComponent } from './pages/category/category.component';
import { AreaComponent } from './pages/area/area.component';
import { AdminComponent } from './pages/admin/admin.component';
import { PropertyDetailComponent } from './pages/property-detail/property-detail.component';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { AdminGuard } from './services/admin.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'category/:type', component: CategoryComponent },
  { path: 'category/:type/:area', component: AreaComponent },
  { path: 'property/:id', component: PropertyDetailComponent },
   { path: 'admin-login', component: AdminLoginComponent },
   {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminGuard], // 👈 هنا الحماية
  },

  // fallback route
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
