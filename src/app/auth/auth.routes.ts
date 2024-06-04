import { Route } from '@angular/router';
import { RegisterComponent } from './feature/register/register.component';
import { LoginComponent } from './feature/login/login.component';

export const registerRoutes: Route[] = [
  {
    path: '',
    component: RegisterComponent,
  },
];

export const loginRoutes: Route[] = [
  {
    path: '',
    component: LoginComponent,
  },
];
