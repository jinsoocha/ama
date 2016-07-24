import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Question } from './question';

@Injectable()
export class QuestionService {
  
  constructor(private http: Http) { }
  
  getAnsweredQuestions() { 
    return this.http.get('http://159.203.241.78:3000/getAnsweredQuestions')
      .toPromise()
      .then(response => response.json() as Question[])
      .catch(this.handleError);
  }

  getQuestion(id: number | string) {
    return this.getAnsweredQuestions()
      .then(questions => questions.find(question => Number(question.Id) === +id));
  }

  private handleError(error: any) {
    console.error('Error: ', error);
    return Promise.reject(error.message || error);
  }
}
