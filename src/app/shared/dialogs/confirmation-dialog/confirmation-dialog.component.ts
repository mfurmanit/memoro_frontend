import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { defaultConfirmDialogSettings } from '@others/constants';
import { isNil, omitBy } from 'lodash-es';
import { ConfirmationDialogData } from '@models/crud-dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent {

  constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ConfirmationDialogData) {
    this.data = {...defaultConfirmDialogSettings, ...omitBy(data, isNil)};
  }
}
