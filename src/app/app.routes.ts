import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from '@/pages/home/home.component';
import { LoginComponent } from '@/pages/login/login.component';
import { DashboardComponent } from '@/pages/dashboard/dashboard.component';
import { ContactInfoIdComponent } from '@/pages/contact-info-id/contact-info-id.component';
import { NotFoundComponent } from '@/pages/not-found/not-found.component';
import { AuthGuard } from '@/shared/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'contact-info',
    component: ContactInfoIdComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'contact-info/:user_id',
    component: ContactInfoIdComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: NotFoundComponent,
  }
];
