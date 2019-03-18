import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppFirebaseService } from '../firebase/firebase.service';
import { map } from 'rxjs/operators';
import { CoreService } from '../core/core.service';


@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate {
  constructor(private fireAuthService: AppFirebaseService, private router: Router, private coreService: CoreService) { }

  canActivate(): boolean | UrlTree
    | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    return this.fireAuthService.authState.pipe(
      map((user) => {
        if (!user) {
          this.coreService.displayToast(`You need to login first.`);
          this.router.navigate(['/login']);
        }
        return !!user;
      })
    );
  }
}
