import { RouterConfig } from '@angular/router';
import { Ask } from './ask.component';

export const askRoutes: RouterConfig = [
  {
    path: '',
    redirectTo: '/ask',
    pathMatch: 'full'
  },
  {
    path: 'ask',
    component: Ask,
    children: [
    ]
  }
];
