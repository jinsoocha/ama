import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router }       from '@angular/router';

import { QuestionService } from './question.service';
import { Question } from './question';

@Component({
  template: `
    <ul class="questions">
      <li *ngFor="let question of questions"
        [class.selected]="isSelected(question)"
        (click)="onSelect(question)">
        {{question.Content}}
      </li>
    </ul>
  `,
})

export class QuestionList implements OnInit, OnDestroy {
  questions: Question[];
  private selectedId: number;
  private sub: any;

  constructor(
    private service: QuestionService,
    private route: ActivatedRoute,
    private router: Router) { }

  isSelected(question: Question) { return question.Id === this.selectedId; }

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
    this.router.navigate(['/feed', question.Id]);
  }
}
