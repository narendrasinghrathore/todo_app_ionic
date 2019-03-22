import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AppFirebaseService } from 'src/app/firebase/firebase.service';
import { Router } from '@angular/router';
import { CoreService } from 'src/app/core/core.service';
import { FireBaseHttpErrorResponse } from 'src/app/models/firebase.model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  formValid = false;

  constructor(private fireAuth: AppFirebaseService,
    private route: Router,
    private coreService: CoreService) { }

  ngOnInit() {
    this.fireAuth.logout();
  }

  onSubmit(event: FormGroup) {
    this.fireAuth.signInEmail(event.value)
      .subscribe(() => {
        this.onSuccessLogin();
      }, (err: FireBaseHttpErrorResponse) => {
        console.log(err);
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
    this.coreService.displayToast(`Logged in, let explore the app.`);
    this.route.navigate(['/home']);
  }

}
