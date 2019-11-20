import { LoginActionsType } from './login.action';
import { ILogin } from '../../../app/models/Login';
import * as fromLoginActions from './login.action';

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

export function reducer(
  state = initialState,
  action: LoginActionsType
): ILoginState {
  switch (action.type) {
    case fromLoginActions.LOGIN: {
      return {
        ...state,
        loading: true
      };
    }
    case fromLoginActions.LOGIN_SUCCESS: {
      const newState = { ...state, ...action.payload };
      return {
        ...newState,
        loading: false,
        loaded: true
      };
    }
    case fromLoginActions.LOGIN_FAIL: {
      console.log(action.payload);
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }

    default:
      return state;
  }

  return state;
}
