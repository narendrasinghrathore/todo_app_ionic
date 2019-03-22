import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppFirebaseService } from 'src/app/firebase/firebase.service';
import { Router } from '@angular/router';
import { CoreService } from 'src/app/core/core.service';
import { tap } from 'rxjs/operators';
import { FireBaseHttpErrorResponse } from 'src/app/models/firebase.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnInit {

  formValid = false;

  constructor(private fireAuth: AppFirebaseService,
    private route: Router, private coreService: CoreService) { }

  ngOnInit() {
    this.fireAuth.logout();

  }

  onSubmit(event: FormGroup) {
    this.fireAuth.registerWithEmail(event.value)
      .subscribe(val => {
        this.onSuccessLogin();
      }, (err: FireBaseHttpErrorResponse) => {
        this.coreService.displayToast(`${err.message}`);
      });
  }

  isFormValid(event: boolean) {
    this.formValid = event;
  }

  signInGoogle() {
    this.fireAuth.signInGoogle().subscribe(
      () => this.onSuccessLogin()
    );
  }

  onSuccessLogin() {
    this.coreService.displayToast(`Great let's start to explore the app.`);
    this.route.navigate(['/']);
  }

}
