import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Form, Validator, Validators } from '@angular/forms';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {

  authForm: FormGroup;
  submitted: EventEmitter<FormGroup> = new EventEmitter();
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.authForm = this.fb.group({
      email: ['', Validators.email],
      password: ['', Validators.minLength(6)]
    });
  }

  onSubmit() {
    this.submitted.emit(this.authForm);
  }

}
