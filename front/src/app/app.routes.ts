import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./home/home').then(m => m.Home) },
    { path: 'edit', loadComponent: () => import('./edit/edit').then(m => m.Edit) },
];
