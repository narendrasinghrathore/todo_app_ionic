import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AppFirebaseService } from 'src/app/firebase/firebase.service';
import { Router } from '@angular/router';
import { CoreService } from 'src/app/core/core.service';
import { FireBaseHttpErrorResponse } from 'src/app/models/firebase.model';
import { FormGroup } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { ILoginState } from '../store/login.reducer';
import { Login } from '../store/login.action';

import * as fromLoginSelectors from '../store/login.selector';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  /**
   * Form is valid or not
   */
  formValid = false;
  /**
   * Login request initiated
   */
  loadingStatus: Observable<boolean>;
  /**
   * Successfully login
   */
  loadedStatus: Observable<boolean>;

  constructor(
    private fireAuth: AppFirebaseService,
    private route: Router,
    private coreService: CoreService,
    private store: Store<ILoginState>
  ) {}

  ngOnInit() {
    this.fireAuth.logout();
    /**
     * Loaded status
     */
    this.loadedStatus = this.store.select(fromLoginSelectors.selectLoaded);
    /**
     * Loading status
     */
    this.loadingStatus = this.store.select(fromLoginSelectors.selectLoading);
  }

  onSubmit(event: FormGroup) {
    this.store.dispatch(new Login(event.value));
    // this.fireAuth.signInEmail(event.value)
    //   .subscribe((data) => {
    //     console.log(data);
    //     this.onSuccessLogin();
    //   }, (err: FireBaseHttpErrorResponse) => {
    //     console.log(err);
    //     this.coreService.displayToast(`${err.message}`);
    //   });
  }

  isFormValid(event: boolean) {
    this.formValid = event;
  }

  signInGoogle() {
    this.fireAuth.signInGoogle().subscribe(() => this.onSuccessLogin());
  }

  onSuccessLogin() {
    this.coreService.displayToast(`Logged in, let explore the app.`);
    this.route.navigate(['/home']);
  }
}
