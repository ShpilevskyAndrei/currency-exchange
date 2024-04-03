import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: "full",
    redirectTo: 'dashboard'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard.component')
      .then(m => m.DashboardComponent)
  },
  {
    path: 'calculator',
    loadComponent: () => import('./features/currency-exchange-calculator/currency-exchange-calculator.component')
      .then(m => m.CurrencyExchangeCalculatorComponent)
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
