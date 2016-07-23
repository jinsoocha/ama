import { provideRouter, RouterConfig } from '@angular/router';

import { feedRoutes } from './feed/feed.routes';
import { askRoutes } from './ask/ask.routes';
import { answerRoutes } from './answer/answer.routes';

export const routes: RouterConfig = [
  ...feedRoutes,
  ...askRoutes,
  ...answerRoutes,
];

export const appRouterProviders = [
  provideRouter(routes)
];
