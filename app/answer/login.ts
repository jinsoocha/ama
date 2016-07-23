import { Component, ElementRef } from '@angular/core';
import { Authentication } from './authentication'
 
@Component({
  providers: [Authentication],
  template: `
    <div>
      <label for="password">Are you Jinsoo? Type your password</label>
      <input [(ngModel)]="password" id="password" type="password">
      <button (click)="login()" type="submit">Login</button>
      <div *ngIf="failed">Failed to login</div>
    </div>
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