import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/search/search.component').then(m => m.SearchComponent),
  },
  {
    path: 'dashboard/:username',
    loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent),
  },
  { path: '**', redirectTo: '' },
];
