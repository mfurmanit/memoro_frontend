import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserService } from '@services/user.service';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private router: Router,
              private userService: UserService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.userService.isUserLoggedIn()
      .pipe(
        map(loggedIn => loggedIn ? this.router.parseUrl('home-page') : true),
        catchError(() => of(true))
      );
  }
}
