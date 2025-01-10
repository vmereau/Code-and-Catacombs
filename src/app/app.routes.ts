import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Code & Catacombs',
    loadComponent: () => import('./landing/landing.component').then((c) => c.LandingComponent),
  },
  {
    path: 'game',
    title: 'Code & Catacombs - Game',
    loadComponent: () => import('./game/game.component').then((c) => c.GameComponent),
  },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];
