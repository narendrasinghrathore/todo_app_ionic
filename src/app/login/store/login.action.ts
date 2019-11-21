import { Action } from '@ngrx/store';
import { ILogin } from 'src/app/models/Login';
import { AppUser } from 'src/app/models/User';

const LoginActionText = '[Login]';

export const LOGIN = `${LoginActionText}`;
export const LOGIN_FAIL = `${LoginActionText} Fail`;
export const LOGIN_SUCCESS = `${LoginActionText} Success`;
export const LOGOUT = '[LOGOUT]';

export class Login implements Action {
  readonly type = LOGIN;
  constructor(public payload: ILogin) {}
}

export class LoginSuccess implements Action {
  readonly type = LOGIN_SUCCESS;
  constructor(public payload: AppUser) {}
}

export class LoginFail implements Action {
  readonly type = LOGIN_FAIL;
  constructor(public payload: any) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;
  constructor(public payload?: any) {}
}

export type LoginActionsType = Login | LoginFail | LoginSuccess | Logout;
