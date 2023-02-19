import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { titleCaseWord, titleUpperWord } from '@others/helper-functions';
import { SnackbarConfig } from '../models/snackbar-config';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar,
              private translate: TranslateService) {
  }

  openSnackBar({message, autoClose = true, translate = true, interpolateObject, panelClass}: SnackbarConfig): void {
    const snackbarPosition: MatSnackBarConfig = {horizontalPosition: 'center', verticalPosition: 'bottom', panelClass};
    const snackBarRef = this.snackBar.open(
      titleCaseWord(translate ? this.translate.instant(message, interpolateObject) : message),
      !autoClose ? titleUpperWord(this.translate.instant('common.close')) : '',
      autoClose ? {duration: 5000, ...snackbarPosition} : snackbarPosition
    );
    snackBarRef.onAction().subscribe(() => snackBarRef.dismiss());
  }
}
