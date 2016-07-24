import { Component, ElementRef } from '@angular/core';
import { Authentication } from './authentication'
 
@Component({
  providers: [Authentication],
  template: `
    <div class="ui form">
      <div class="field">
        <label for="password">Are you Jinsoo? Type your password</label>
        <input [(ngModel)]="password" id="password" type="password">
      </div>
      <sm-button class="ui primary button" (click)="login()" type="submit">Login</sm-button>
    </div>
    <div class="ui negative message" *ngIf="failed">Failed to login</div>
  `
})
 
export class Login {
  password: string;
  failed: boolean = false;
  email: string;

  constructor(
    private service: Authentication) {}

  login() {
    if(!this.service.login(this.password)){
      this.failed = true;
    }
  }
}