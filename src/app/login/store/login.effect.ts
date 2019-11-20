import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AppFirebaseService } from '../../../app/firebase/firebase.service';
import { LOGIN, Login, LoginFail, LoginSuccess } from './login.action';
import {
  switchMap,
  map,
  exhaustMap,
  catchError,
  tap,
  delay
} from 'rxjs/operators';
import { ILogin } from '../../../app/models/Login';
import { of } from 'rxjs';

@Injectable()
export class LoginEffectService {
  constructor(private actions: Actions, private fireAuth: AppFirebaseService) {}

  /**
   * Login effect, will initiate login request using firebase service on action
   * '[Login]'
   */
  login$ = createEffect(() =>
    this.actions.pipe(
      ofType(LOGIN),
      map((data: Login) => data.payload),
      exhaustMap((data: ILogin) =>
        this.fireAuth.signInEmail(data).pipe(
          delay(2000),
          map(success => new LoginSuccess(success)),
          catchError(err => of(new LoginFail(err)))
        )
      )
    )
  );
}
