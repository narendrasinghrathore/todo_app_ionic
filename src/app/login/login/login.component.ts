import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { ILoginState } from '../store/login.reducer';
import { Login, Logout } from '../store/login.action';

import * as fromLoginSelectors from '../store/login.selector';
import { tap } from 'rxjs/operators';

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
  loadingStatus = this.store.select(fromLoginSelectors.selectLoading);
  /**
   * Successfully login
   */
  loadedStatus = this.store.select(fromLoginSelectors.selectLoaded);

  constructor(private store: Store<ILoginState>) {}

  ngOnInit() {
    /**
     * Dispatch logout action on component load
     */
    this.store.dispatch(new Logout());
  }

  onSubmit(event: FormGroup) {
    this.store.dispatch(new Login(event.value));
  }

  isFormValid(event: boolean) {
    this.formValid = event;
  }
}
