import { createSelector } from '@ngrx/store';
import { ILoginState } from './login.reducer';

export const selectState = (state: ILoginState) => state;
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
