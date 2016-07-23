import { Component } from '@angular/core';
import { REACTIVE_FORM_DIRECTIVES, FormBuilder, Validators } from '@angular/forms';
import { Info } from './info.component';
import { AskService } from './ask.service';

@Component({
  templateUrl: './ask.component.html',
  directives: [REACTIVE_FORM_DIRECTIVES, Info],
  providers: [AskService]
})

export class Ask {
  askForm: any;
  sent: boolean = false;
  message: string = '';
  active: boolean = true;
  
  constructor(
    private formBuilder: FormBuilder,
    private service: AskService
  ) {
    this.askForm = this.formBuilder.group({
      'name': ['', Validators.required],
      'email': ['', [Validators.required]],
      'content': ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  reset() {
    for (let input in this.askForm.controls) {
      this.askForm.controls[input].updateValue('');
      this.askForm.controls[input].setErrors(null);
    }
  }
  
  send(value:any):void {
    if (this.askForm.dirty && this.askForm.valid) {
      this.service.askQuestion(this.askForm._value)
        .then(response => {
          if (response) {
            this.sent = true;
            this.message = 'Your question has been sent!';
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
