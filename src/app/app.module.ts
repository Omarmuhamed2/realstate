import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { CategoryComponent } from './pages/category/category.component';
import { AreaComponent } from './pages/area/area.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PropertyDetailComponent } from './pages/property-detail/property-detail.component';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { AboutMeComponent } from './pages/about-me/about-me.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    CategoryComponent,
    AreaComponent,
    AdminComponent,
    PropertyDetailComponent,
    AdminLoginComponent,
    AboutMeComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
