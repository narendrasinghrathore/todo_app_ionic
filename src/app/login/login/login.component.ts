import { Component, OnInit } from '@angular/core';
import { AppFirebaseService } from 'src/app/firebase/firebase.service';
import { Router } from '@angular/router';
import { CoreService } from 'src/app/core/core.service';
import { FireBaseHttpErrorResponse } from 'src/app/models/firebase.model';
import { FormGroup } from '@angular/forms';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  formValid = false;

  constructor(private fireAuth: AppFirebaseService,
    private route: Router,
    private coreService: CoreService) { }

  ngOnInit() {

  }

  onSubmit(event: FormGroup) {
    this.fireAuth.signInEmail(event.value)
      .pipe(
        tap(val =>
          this.coreService.displayToast(`Logged in, let explore the app.`))
      )
      .subscribe(val => {
        console.log(val);
        this.route.navigate(['/']);
      }, (err: FireBaseHttpErrorResponse) => {
        console.log(err);
        this.coreService.displayToast(`${err.message}`);
      });
  }

  isFormValid(event: boolean) {
    this.formValid = event;
  }

}
