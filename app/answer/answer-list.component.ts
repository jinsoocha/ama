import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router }       from '@angular/router';

import { AnswerService } from './answer.service';
import { Question } from '../feed/question';
import { Authentication } from './authentication'

@Component({
  template: `
    <sm-card class="ui centered cards">
      <sm-card class="card"
        *ngFor="let question of questions"
        [class.selected]="isSelected(question)"
        (click)="onSelect(question)">
        <sm-card class="content">
          <sm-card class="header">{{question.Name}}</sm-card>
          <sm-card class="meta">created at {{question.Created}}</sm-card>
          <div class="description">{{question.Content}}</div>
        </sm-card>
      </sm-card>
    </sm-card>
  `,
})

export class AnswerList implements OnInit, OnDestroy {
  questions: any[];
  private selectedId: number;
  private sub: any;

  constructor(
    private _service: Authentication,
    private service: AnswerService,
    private route: ActivatedRoute,
    private router: Router) { }

  isSelected(question: Question) { return question.Id === this.selectedId; }

  ngOnInit() {
    this._service.checkCredentials();
    this.sub = this.route
      .params
      .subscribe(params => {
        this.selectedId = +params['id'];
        this.service.getQuestions()
          .then(questions => this.questions = questions);
      });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  onSelect(question: Question) {
    this.router.navigate(['/answer/question', question.Id]);
  }

  logout() {
    this._service.logout();
  }
}
