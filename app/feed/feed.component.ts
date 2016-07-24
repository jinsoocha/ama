import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { QuestionService } from './question.service';

@Component({
  template:  `
    <router-outlet></router-outlet>
  `,
  directives: [ROUTER_DIRECTIVES],
  providers:  [QuestionService]
})
export class Feed { }

