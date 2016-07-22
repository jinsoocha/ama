import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  selector: 'my-app',
  template: `
    <h1 class="title">Ask Jinsoo For The World</h1>
    <nav>
      <a routerLink="/feed" routerLinkActive="active"
         [routerLinkActiveOptions]="{ exact: true }">Feed</a>
      <a routerLink="/ask" routerLinkActive="active">Ask a question</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  providers:  [],
  directives: [ROUTER_DIRECTIVES]
})
export class AppComponent {
}
