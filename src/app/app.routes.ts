import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
    },
    {
        path: 'register',
        loadChildren: () => import('./auth/auth.routes').then(m => m.registerRoutes)
    },
    {
        path: 'login',
        loadChildren: () => import('./auth/auth.routes').then(m => m.loginRoutes)
    }
];
