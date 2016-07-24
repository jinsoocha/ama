import { Injectable } from '@angular/core';
import { Http, Response,  Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Question } from '../feed/question';

@Injectable()
export class AskService {
  
  constructor(private http: Http) { }
  
  askQuestion (askForm: any): Promise<Question> {
    let body = JSON.stringify(askForm);
    let headers = new Headers({ 
      'Content-Type': 'application/json',
     });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('http://159.203.241.78:3000/askQuestion', body, options)
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
