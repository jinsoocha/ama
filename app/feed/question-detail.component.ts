import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';

import { QuestionService } from './question.service';
import { Question } from './question';


@Component({
  template: `
  <sm-item class="ui items" *ngIf="question">
    <sm-item class="item">
      <sm-item class="content">
        <div class="header"><strong>Question:</strong> {{question.Content}}</div>
        <div class="description"><strong>Answer:</strong> {{question.Answer}}</div>
        <div class="meta">{{question.Updated}}</div>
      </sm-item>
    </sm-item>
  </sm-item>
  `,
})

export class QuestionDetail implements OnInit, OnDestroy {
  question: any;
  private sub: any;

  constructor(
    private service: QuestionService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.sub = this.route
      .params
      .subscribe(params => {
        let id = +params['id'];
        this.service.getQuestion(id)
          .then(question => {
            if (question) {
              this.question = question;
            } else {
              this.gotoFeed();
            }
          });
      });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  gotoFeed() {
    let questionId = this.question ? this.question.Id : null;
    this.router.navigate(['/feed', {id: questionId}]);
  }
}
