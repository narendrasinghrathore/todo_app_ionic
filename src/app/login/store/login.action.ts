import { Action } from '@ngrx/store';
import { ILogin } from 'src/app/models/Login';

export const LOGIN = '[Login]';
export const LOGIN_FAIL = '[Login] Fail';
export const LOGIN_SUCCESS = '[Login] Success';

export class Login implements Action {
  readonly type = LOGIN;
  constructor(public payload: ILogin) {}
}

export class LoginSuccess implements Action {
  readonly type = LOGIN_SUCCESS;
  constructor(public payload: ILogin) {}
}

export class LoginFail implements Action {
  readonly type = LOGIN_FAIL;
  constructor(public payload: any) {}
}

export type LoginActionsType = Login | LoginFail | LoginSuccess;
