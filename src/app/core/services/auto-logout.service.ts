import { Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { SnackbarService } from '@services/snackbar.service';
import { isNullOrUndefined } from '@others/helper-functions';
import { MatDialog } from '@angular/material/dialog';

const checkInterval = 15000; // Interwał weryfikacji aktywności użytkownika po stronie klienta (15 sekund)
const requestInterval = 840000; // Interwał wysyłki żądania do serwera (14 minut)
const lastRequestStorageKey = 'lastRequest';

@Injectable({
  providedIn: 'root'
})
export class AutoLogoutService implements OnDestroy {
  private interval: NodeJS.Timer | undefined;
  private authenticationService: AuthenticationService | null = null;
  private readonly subscriptions: Subscription = new Subscription();

  constructor(private dialog: MatDialog,
              private snackbarService: SnackbarService) {
  }

  static getLastRequest(): number {
    const value = localStorage.getItem(lastRequestStorageKey);
    if (isNullOrUndefined(value)) throw Error('No last request provided!');
    else return parseInt(value, 10);
  }

  static setLastRequest(): void {
    localStorage.setItem(lastRequestStorageKey, Date.now().toString());
  }

  ngOnDestroy(): void {
    this.clearTimer();
    this.subscriptions.unsubscribe();
  }

  initTimer(authenticationService: AuthenticationService): void {
    this.authenticationService = authenticationService;
    this.clearTimer();
    this.initInterval();
  }

  clearTimer(): void {
    clearInterval(this.interval);
    this.interval = undefined;
  }

  private initInterval(): void {
    this.interval = setInterval(() => this.checkActivity(), checkInterval);
  }

  private checkActivity(): void {
    const lastRequestTime: number = AutoLogoutService.getLastRequest(); // Czas ostatniego wysłanego żądania do serwera
    const currentTime: number = Date.now(); // Bieżący czas

    const requestDiff: number = currentTime - lastRequestTime;
    const requestTimeExceeded: boolean = requestDiff >= requestInterval; // Informacja, czy czas ostatniego żądania przekroczył interwał

    if (requestTimeExceeded) this.logout();
  }

  private logout(): void {
    if (this.authenticationService) {
      this.dialog.closeAll();
      this.authenticationService.logout();
      this.snackbarService.openSnackBar({message: 'messages.sessionExpired'});
    }
  }
}
