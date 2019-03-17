import { Component, OnInit } from '@angular/core';
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
})
export class RegisterComponent implements OnInit {

  formValid = false;

  constructor(private fireAuth: AppFirebaseService,
    private route: Router, private coreService: CoreService) { }

  ngOnInit() {

  }

  onSubmit(event: FormGroup) {
    this.fireAuth.registerWithEmail(event.value)
      .pipe(
        tap(val => this.coreService.displayToast(`Great let's start to explore the app.`))
      )
      .subscribe(val => {
        this.route.navigate(['/']);
      }, (err: FireBaseHttpErrorResponse) => {
        this.coreService.displayToast(`${err.message}`);
      });
  }

  isFormValid(event: boolean) {
    this.formValid = event;
  }

}
