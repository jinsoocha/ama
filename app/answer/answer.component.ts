import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, Router, CanActivate } from '@angular/router';

import { AnswerService } from './answer.service';
import { Authentication } from './authentication';

@Component({
  template:  `
    <router-outlet></router-outlet>
  `,
  directives: [ROUTER_DIRECTIVES],
  providers:  [AnswerService, Authentication]
})

export class Answer { }
