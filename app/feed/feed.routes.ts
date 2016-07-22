import { RouterConfig } from '@angular/router';

import { Feed } from './feed.component';
import { QuestionDetail } from './question-detail.component';
import { QuestionList } from './question-list.component';

export const feedRoutes: RouterConfig = [
  {
    path: '',
    redirectTo: '/feed',
    pathMatch: 'full'
  },
  {
    path: 'feed',
    component: Feed,
    children: [
      {
        path: ':id',
        component: QuestionDetail
      },
      {
        path: '',
        component: QuestionList
      }
    ]
  }
];
