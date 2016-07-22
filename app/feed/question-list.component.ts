import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router }       from '@angular/router';

import { Question, QuestionService } from './question.service';

@Component({
  template: `
    <ul class="questions">
      <li *ngFor="let question of questions"
        [class.selected]="isSelected(question)"
        (click)="onSelect(question)">
        {{question.title}}
      </li>
    </ul>
  `,
})
export class QuestionList implements OnInit, OnDestroy {
  questions: any[];
  private selectedId: number;
  private sub: any;

  constructor(
    private service: QuestionService,
    private route: ActivatedRoute,
    private router: Router) { }

  isSelected(question: Question) { return question.id === this.selectedId; }

  ngOnInit() {
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
    this.router.navigate(['/feed', question.id]);
  }
}
