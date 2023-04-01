import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SnackbarService } from '@services/snackbar.service';
import { ActionEvent } from '@models/action-event';
import { ActionType } from '@enums/action-type';
import { filter, switchMap } from 'rxjs/operators';
import { isNullOrUndefined } from '@others/helper-functions';
import { Observable } from 'rxjs';
import { CrudDialog, CrudDialogData } from '@models/crud-dialog';
import { ComponentType } from '@angular/cdk/overlay';
import { CrudHandler } from '@others/crud-handler';
import { Card } from '@models/card';
import { CardService } from '@services/card.service';

export class CardHandler extends CrudHandler<Card> {

  protected constructor(private service: CardService,
                        private dialog: MatDialog,
                        private snackbarService: SnackbarService) {
    super(service, dialog, snackbarService);
  }

  protected getActionPrefix(): string {
    return '';
  }

  protected getDialog(type: ActionType | undefined): ComponentType<CrudDialog> {
    return undefined;
  }

  protected getDialogData(type: ActionType | undefined, data: Card | undefined): Observable<CrudDialogData> {
    return undefined;
  }

}
