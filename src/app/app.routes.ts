import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { FeaturesComponent } from '@/components/features/features.component';
import { PricingComponent } from '@/components/pricing/pricing.component';
import { SignInComponent } from '@/components/sign-in/sign-in.component';
import { SignUpComponent } from '@/components/sign-up/sign-up.component';

export const routes: Routes = [

  {
    path: 'features',
    component: FeaturesComponent,
  },
  {
    path: 'pricing',
    component: PricingComponent,
  },
  {
    path: 'login',
    component: SignInComponent,
  },
  {
    path: 'signup',
    component: SignUpComponent,
  },
];
