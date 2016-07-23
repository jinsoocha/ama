import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import { REACTIVE_FORM_DIRECTIVES, FormBuilder, Validators } from '@angular/forms';

import { AnswerService } from './answer.service';
import { Question } from '../feed/question';
import { Info } from '../ask/info.component';
import { Authentication } from './authentication'

@Component({
  templateUrl: './answer-form.component.html',
  directives: [REACTIVE_FORM_DIRECTIVES, Info],
})

export class AnswerForm implements OnInit, OnDestroy {
  question: any;
  private sub: any;
  answerForm: any;
  sent: boolean = false;
  message: string = '';
  active: boolean = true;
  
  constructor(
    private _service: Authentication,
    private service: AnswerService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { 
    this.answerForm = this.formBuilder.group({
      'answer': ['', [Validators.required, Validators.minLength(1)]]
    })
  }

  ngOnInit() {
    this._service.checkCredentials();
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
    this.router.navigate(['/answer']);
  }

  reset() {
    for (let input in this.answerForm.controls) {
      this.answerForm.controls[input].updateValue('');
      this.answerForm.controls[input].setErrors(null);
    }
  }
  
  send(value:any):void {
    if (this.answerForm.dirty && this.answerForm.valid) {
      this.answerForm._value.id = this.question.Id
      this.service.answerQuestion(this.answerForm._value)
        .then(response => {
          if (response) {
            this.sent = true;
            this.message = 'Your answer has been sent!';
            setTimeout(() => {
              this.active = true;
              this.reset()
            }, 0);
          }
        })
        .catch(err => {
          this.sent = true;
          this.message = 'There has been an error. Please try later.'
        })
    }
  }
}