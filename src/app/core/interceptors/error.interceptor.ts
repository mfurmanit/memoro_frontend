import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, map, takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from '@services/authentication.service';
import { SnackbarService } from '@services/snackbar.service';
import { AutoLogoutService } from '@services/auto-logout.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private requestsSubject: Subject<void> = new Subject<void>();

  constructor(private snackbarService: SnackbarService,
              private authenticationService: AuthenticationService,
              private dialog: MatDialog,
              private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    AutoLogoutService.setLastRequest();
    return next.handle(request).pipe(
      takeUntil(this.requestsSubject.asObservable()),
      map((event: HttpEvent<any>) => event),
      catchError((response) => {
        if (response instanceof HttpErrorResponse) {
          const error = (response as HttpErrorResponse);
          switch (error.status) {
            case 400:
            case 403:
            case 500:
              this.snackbarService.openSnackBar({message: response.error.message, translate: false});
              break;
            case 401:
              this.handleUnauthorizedError();
              break;
          }
        }
        return throwError(response);
      })) as any;
  }

  private handleUnauthorizedError(): void {
    const redirectUrl: string = `/login?redirectUrl=${this.router.routerState.snapshot.url.substring(1)}`;
    this.requestsSubject.next();
    this.dialog.closeAll();
    this.authenticationService.clearUserContextAndSystemState(redirectUrl);
    this.snackbarService.openSnackBar({message: 'messages.sessionExpired'});
  }
}
