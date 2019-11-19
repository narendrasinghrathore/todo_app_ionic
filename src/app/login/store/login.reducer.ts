import { LoginActionsType } from './login.action';
import { ILogin } from '../../../app/models/Login';

import * as fromLoginActions from './login.action';
import { strict } from 'assert';

export interface ILoginState {
  user: ILogin | {};
  loaded: boolean;
  loading: boolean;
}

export const initialState: ILoginState = {
  user: {},
  loading: false,
  loaded: false
};

export function reducer(state = initialState, action: LoginActionsType) {
  switch (action.type) {
    case fromLoginActions.LOGIN:
      console.log('Here')
      state = {
        ...state,
        loading: true
      };
      break;

    case fromLoginActions.LOGIN_SUCCESS:
        console.log('Sucess Here')
      state = {
        ...state,
        loading: false,
        loaded: true
      };
      break;

    case fromLoginActions.LOGIN_FAIL:
      state = {
        ...state,
        loading: false,
        loaded: false
      };
      break;

    default:
      return state;
      break;
  }

  return state;
}
