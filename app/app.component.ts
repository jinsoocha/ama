import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';

import { SEMANTIC_COMPONENTS, SEMANTIC_DIRECTIVES } from "ng-semantic";

@Component({
  selector: 'my-app',
  template: `
    <sm-grid class="ui three row padded centered grid">
      <sm-grid class="row">
        <sm-header class="ui huge header">Ask Jinsoo For The World</sm-header>
        <sm-menu class="ui pink three item inverted menu">
          <a class="active item" routerLink="/feed" routerLinkActive="active"
            [routerLinkActiveOptions]="{ exact: true }">
            <i class="home icon"></i>Feed
          </a>
          <a class="item" routerLink="/ask" routerLinkActive="active">
            <i class="mail icon"></i>Ask a question
          </a>
          <a class="item" routerLink="/answer" routerLinkActive="active">
            <i class="setting icon"></i>Admin
          </a>
        </sm-menu>
        <div>
          <h3>Hi, my name is Jinsoo Cha.</h3>
          <p>
          I am a full stack developer in San Francisco, focusing on Javascript technologies.<br/>
          Ask For The World is a platform where you can create your own page to answer your friends or anyone who are curious about your experiences, values and perspectives.<br/> 
          The project is in Beta. Send me a quick email at jinsoocha222@gmail.com to be the first ones to have an Ask For The World page!
          </p>
        </div>
      </sm-grid>
      <sm-grid class="row">
        <router-outlet></router-outlet>
      </sm-grid>
    </sm-grid>
  `,
  providers:  [],
  directives: [ROUTER_DIRECTIVES, SEMANTIC_COMPONENTS, SEMANTIC_DIRECTIVES]
})
export class AppComponent {}
