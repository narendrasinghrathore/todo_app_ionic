import { NavigationExtras } from '@angular/router';
/**
 * Interface type used in route actions for ngrx/store
 */
export interface IGo {
  path: any[];
  query?: object;
  extras?: NavigationExtras;
}
