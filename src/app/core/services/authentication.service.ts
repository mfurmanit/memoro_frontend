import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, ReplaySubject, Subscription } from 'rxjs';
import { filterNil } from '@others/operators';
import { UserService } from './user.service';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { LoginData } from '../models/login-data';
import { AuthenticationResult } from '../models/authentication-result';
import { isNullOrUndefined } from '@others/helper-functions';
import { HttpClient } from '@angular/common/http';
import { SnackbarService } from '@services/snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements OnDestroy {
  private userContext: ReplaySubject<User | null> = new ReplaySubject<User | null>(1);
  private readonly subscriptions = new Subscription();

  constructor(private router: Router,
              private http: HttpClient,
              private userService: UserService,
              private snackbarService: SnackbarService) {
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  getUserContext(): Observable<User> {
    return this.userContext.pipe(filterNil());
  }

  getNullableUserContext(): Observable<User | null> {
    return this.userContext;
  }

  loginUser(data: LoginData): void {
    const formData: FormData = new FormData();
    formData.append('username', data.username);
    formData.append('password', data.password);
    this.login(formData, data.redirectUrl);
  }

  logout(redirectPath?: string): void {
    this.subscriptions.add(this.logoutCall()
      .subscribe({
        next: () => this.clearUserContextAndSystemState(redirectPath),
        error: () => this.clearUserContextAndSystemState(redirectPath),
      })
    );
  }

  loadUserContext(redirectUrl?: string): void {
    this.subscriptions.add(this.loadUserDetailsAndSystemState(redirectUrl)
      .subscribe({
        next: user => this.setUserContextAndSystemState(user),
        error: () => () => this.clearUserContextAndSystemState()
      })
    );
  }

  clearUserContextAndSystemState(redirectPath: string = 'login'): void {
    this.userContext.next(null);
    this.router.navigateByUrl(redirectPath);
  }

  private login(formData: FormData, redirectUrl?: string): void {
    this.subscriptions.add(this.loginCall(formData)
      .subscribe({
          next: () => this.loadUserContext(redirectUrl),
          error: (error) => this.snackbarService.openSnackBar({
            message: error.error,
            translate: false
          })
        }
      )
    );
  }

  private setUserContextAndSystemState(result: AuthenticationResult): void {
    const user = result.user;
    this.userContext.next(user);

    if (!isNullOrUndefined(result.redirectUrl)) this.router.navigateByUrl(result.redirectUrl);
  }

  private loadUserDetailsAndSystemState(redirectUrl?: string): Observable<AuthenticationResult> {
    return this.userService.getUserDetails()
      .pipe(map(user => ({user, redirectUrl} as AuthenticationResult)));
  }

  private loginCall(formData: FormData): Observable<void> {
    return this.http.post<void>('/login', formData);
  }

  private logoutCall(): Observable<void> {
    return this.http.post<void>('/logout', {});
  }
}
