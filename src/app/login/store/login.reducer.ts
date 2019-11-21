import { LoginActionsType } from './login.action';
import { ILogin } from '../../../app/models/Login';
import * as fromLoginActions from './login.action';
import { AppUser } from 'src/app/models/User';
import { ActionReducerMap } from '@ngrx/store';

export interface ILoginState {
  user: AppUser | {};
  loaded: boolean;
  loading: boolean;
}

export interface LoginAppState {
  login: ILoginState;
}

export const initialState: ILoginState = {
  user: {
    authenticated: false
  },
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
      const user = { ...state.user, authenticated: true, ...action.payload };
      return {
        ...state,
        user,
        loading: false,
        loaded: true
      };
    }
    case fromLoginActions.LOGIN_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }

    case fromLoginActions.LOGOUT: {
      return {
        ...initialState
      };
    }

    default:
      return state;
  }

  return state;
}

export const reducers: ActionReducerMap<LoginAppState> = {
  login: reducer
};


