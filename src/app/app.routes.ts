import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from '@/pages/home/home.component';
import { ContactInfoIdComponent } from '@/pages/contact-info-id/contact-info-id.component';
import { CONTACT_INFO_URL } from '@/constants/variables';

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
    path: 'contact-info',
    component: ContactInfoIdComponent
  },
  {
    path: 'contact-info/:user_id',
    component: ContactInfoIdComponent
  },
];
