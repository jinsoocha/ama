import { RouterConfig } from '@angular/router';

import { Answer } from './answer.component';
import { AnswerForm } from './answer-form.component';
import { AnswerList } from './answer-list.component';
import { Login } from './login';

export const answerRoutes: RouterConfig = [
  {
    path: '',
    redirectTo: '/answer',
    pathMatch: 'full'
  },
  {
    path: 'answer',
    component: Answer,
    children: [
      {
        path: 'question/:id',
        component: AnswerForm
      },
      {
        path: '',
        component: Login
      },
      {
        path: 'list',
        component: AnswerList
      }
    ]
  }
];
