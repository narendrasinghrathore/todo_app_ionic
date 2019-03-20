import { Component, OnInit, EventEmitter, Output, ChangeDetectionStrategy, ViewEncapsulation, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom
})
export class AuthComponent implements OnInit, OnDestroy {

  authForm: FormGroup;
  @Output()
  submitted: EventEmitter<FormGroup> = new EventEmitter();

  @Output()
  formValid: EventEmitter<boolean> = new EventEmitter(false);

  @Output()
  onGoogleLogin: EventEmitter<any> = new EventEmitter(null);

  formValidSubs: Subscription;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {

    this.authForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });


    this.formValidSubs = this.authForm.statusChanges.pipe(
      distinctUntilChanged()
    ).subscribe(() => {
      this.formValid.emit(
        this.authForm.valid
      );
    });
  }

  get email() { return this.authForm.get('email'); }

  get password() { return this.authForm.get('password'); }

  onSubmit() {
    if (this.authForm.valid) {
      this.submitted.emit(this.authForm);
    }
  }

  googleLogin(){
    this.onGoogleLogin.emit(null);
  }

  ngOnDestroy(): void {
    this.formValidSubs.unsubscribe();
  }

}
