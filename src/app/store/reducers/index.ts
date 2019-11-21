import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { environment } from 'environments/environment';
import { RouterStateUrl } from './customer-serializer.router';

export interface State {
  routerReducer?: RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<State> = {
  routerReducer: routerReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
