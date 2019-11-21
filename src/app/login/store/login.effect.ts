import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AppFirebaseService } from '../../../app/firebase/firebase.service';
import {
  LOGIN,
  Login,
  LoginFail,
  LoginSuccess,
  LOGIN_SUCCESS,
  LOGOUT,
  Logout
} from './login.action';
import { map, catchError, tap, switchMap } from 'rxjs/operators';
import { ILogin } from '../../../app/models/Login';
import { of } from 'rxjs';
import { FireBaseHttpErrorResponse } from 'src/app/models/firebase.model';

import * as FromRootRouterActions from '../../store/actions';
import { CoreService } from 'src/app/core/core.service';

@Injectable()
export class LoginEffectService {
  constructor(
    private actions: Actions,
    private fireAuth: AppFirebaseService,
    private coreService: CoreService
  ) {}

  /**
   * Login effect, will initiate login request using firebase service on action
   * '[Login]'
   */
  login$ = createEffect(() =>
    this.actions.pipe(
      ofType(LOGIN),
      map((data: Login) => data.payload),
      switchMap((data: ILogin) =>
        this.fireAuth.signInEmail(data).pipe(
          map(success => new LoginSuccess(success)),
          catchError((err: FireBaseHttpErrorResponse) => {
            this.coreService.displayToast(`${err.message}`);
            return of(new LoginFail(err.message));
          })
        )
      )
    )
  );

  /**
   * Login success effect, run after successful login.
   * Will redirect to route /home if login is success and update the state
   * with user data
   */
  loginSuccess$ = createEffect(() =>
    this.actions.pipe(
      ofType(LOGIN_SUCCESS),
      map((action: LoginSuccess) => action),
      map(() => {
        this.coreService.displayToast(`Logged in, let explore the app.`);
        return new FromRootRouterActions.Go({
          path: ['/home']
        });
      })
    )
  );

  logout$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(LOGOUT),
        tap(() => {
          this.fireAuth.logout();
        }),
        map((action: Logout) => action)
      ),
    { dispatch: false }
  );
}
