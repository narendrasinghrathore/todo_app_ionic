import { Actions, createEffect, ofType, Effect } from '@ngrx/effects';
import * as RouterActions from '../actions/router.action';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable()
export class RouterEffect {
  constructor(
    private action$: Actions,
    private router: Router,
    private location: Location
  ) {}

  @Effect({ dispatch: false })
  navigate$ = this.action$.pipe(
    ofType(RouterActions.GO),
    tap((action: RouterActions.Go) => {
      const { path, query: queryParams, extras } = action.payload;
      this.router.navigate(path, { queryParams, ...extras });
    })
  );

  @Effect({ dispatch: false })
  navigateBack$ = this.action$.pipe(
    ofType(RouterActions.BACK),
    tap(() => this.location.back())
  );

  @Effect({ dispatch: false })
  navigateForward$ = this.action$.pipe(
    ofType(RouterActions.FORWARD),
    tap(() => this.location.forward())
  );
}
