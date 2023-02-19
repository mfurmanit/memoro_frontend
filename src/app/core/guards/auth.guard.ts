import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserService } from '@services/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.userService.isUserLoggedIn()
      .pipe(
        map(loggedIn => loggedIn ? true : this.router.parseUrl('login')),
        catchError(() => of(this.router.parseUrl('login')))
      );
  }
}
