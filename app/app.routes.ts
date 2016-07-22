import { provideRouter, RouterConfig } from '@angular/router';

import { feedRoutes } from './feed/feed.routes';
import { askRoutes } from './ask/ask.routes';

export const routes: RouterConfig = [
  ...feedRoutes,
  ...askRoutes
];

export const appRouterProviders = [
  provideRouter(routes)
];
