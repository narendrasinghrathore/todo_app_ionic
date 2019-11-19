import { createAction, props, Action } from '@ngrx/store';
import { IGo } from '../../../app/models/go.interface';

const _ROUTER = '[ROUTER]';
export const GO = `${_ROUTER} Go`;
export const BACK = `${_ROUTER} Navigate Back`;
export const FORWARD = `${_ROUTER} Navigate Forward`;

/**
 * Navigate to given route
 */
export class Go implements Action {
  readonly type = GO;
  constructor(public payload: IGo) {}
}

/**
 * Navigate back from current route
 */
export class Back implements Action {
  readonly type = BACK;
}
/**
 * Navigate forward from current route, if any
 */
export class Forward implements Action {
  readonly type = FORWARD;
}
