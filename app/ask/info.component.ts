import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'info',
  template: `<div class="ui negative message" *ngIf="errorMessage !== null">{{errorMessage}}</div>`
})
export class Info {
  @Input() control: FormControl;
  constructor() { }

  get errorMessage() {
    for (let propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
        if (propertyName === "required") {
          return "This field is required";
        } else if (propertyName === "pattern") {
          return "Please enter a valid email"
        }
      }
    }
    
    return null;
  }
}