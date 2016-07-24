import { Injectable } from '@angular/core';
import { Http, Response,  Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AnswerService {

  constructor(private http: Http) { }
  
  getQuestions() { 
    return this.http.get('http://159.203.241.78:3000/getQuestions')
      .toPromise()
      .then(response => response.json() as any[])
      .catch(this.handleError);
  }

  getQuestion(id: number | string) {
    return this.getQuestions()
      .then(questions => questions.find(question => Number(question.Id) === +id));
  }

  answerQuestion (answerForm: any) {
    let body = JSON.stringify(answerForm);
    let headers = new Headers({ 
      'Content-Type': 'application/json',
     });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('http://159.203.241.78:3000/answerQuestion', body, options)
               .toPromise()
               .then(this.getResponse)
               .catch(this.handleError);
  }

  private getResponse(res: Response) {
    let body = res.json();
    return body || { };
  }

  private handleError(error: any) {
    console.error('Error: ', error);
    return Promise.reject(error.message || error);
  }
}



