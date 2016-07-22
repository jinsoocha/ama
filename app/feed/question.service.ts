export class Question {
  constructor(public id: number, public title: string) { }
}

// TODO: Async call to get the existing questions with answers
const QUESTIONS = [
  new Question(1, 'How did you learn Chinese?'),
  new Question(2, 'What kinds of apps have you built?'),
  new Question(3, 'Which country would you like to live in?'),
  new Question(4, 'How is living in SF?'),
];

let questionsPromise = Promise.resolve(QUESTIONS);

import { Injectable } from '@angular/core';

@Injectable()
export class QuestionService {

  getQuestions() { return questionsPromise; }

  getQuestion(id: number | string) {
    return questionsPromise
      .then(questions => questions.find(question => question.id === +id));
  }
}
