import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ILoginState, LoginAppState } from './login.reducer';
import environment from '../../../environments/environment';

export const loginAppState = createFeatureSelector<LoginAppState>(
  environment.store.login.storeName
);

export const selectState = createSelector(
  loginAppState,
  (state: LoginAppState) => state.login
);
/**
 * Selector for one piece of state i.e loading
 */
export const selectLoading = createSelector(
  selectState,
  (state: ILoginState) => state.loading
);

/**
 * Selector for one piece of state i.e loaded
 */
export const selectLoaded = createSelector(
  selectState,
  (state: ILoginState) => state.loaded
);

/**
 * Selector for one piece of state i.e user
 */
export const selectUser = createSelector(
  selectState,
  (state: ILoginState) => state.user
);
