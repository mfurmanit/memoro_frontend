import { Observable } from 'rxjs';
import { SnackbarService } from '@services/snackbar.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/overlay';
import { filter, switchMap } from 'rxjs/operators';
import { isNullOrUndefined } from '@others/helper-functions';
import { BaseComponent } from '@components/base/base.component';
import { BaseModel } from '@models/base-model';
import { ActionEvent } from '@models/action-event';
import { CrudService } from '@models/crud-service';
import { ActionType } from '@enums/action-type';
import { CrudDialog, CrudDialogData } from '@models/crud-dialog';

export abstract class CrudHandler<T extends BaseModel> extends BaseComponent {

  protected constructor(private crudService: CrudService<T>,
                        private crudDialog: MatDialog,
                        private crudSnackbar: SnackbarService) {
    super();
  }

  onActionClicked(event: ActionEvent<T>): void {
    this.openDialog(event.type, event.element);
  }

  openDialog(type: ActionType, data?: T): void {
    this.subscriptions.add(
      this.getDialogData(type, data).pipe(
        switchMap(dialogData => this.crudDialog.open(this.getDialog(type), {
          ...this.getDialogConfig(),
          data: dialogData,
          autoFocus: false
        }).afterClosed())
      ).pipe(
        filter(value => type === ActionType.DELETE ? value : !isNullOrUndefined(value)),
        switchMap(value => this.getMethod(type, value, data?.id))
      ).subscribe(() => this.handleActionSuccess(type)));
  }

  protected handleActionSuccess(type: ActionType): void {
    this.crudSnackbar.openSnackBar({message: `${this.getActionPrefix()}.${type}`});
    this.reloadData();
  }

  protected getMethod(type: ActionType, data?: T, id?: string): Observable<T | void> {
    if (type === ActionType.CREATE && !isNullOrUndefined(data))
      return this.crudService.create(data);
    else if (type === ActionType.EDIT && !isNullOrUndefined(data) && !isNullOrUndefined(id))
      return this.crudService.update(id, data);
    else if (type === ActionType.DELETE && !isNullOrUndefined(id))
      return this.crudService.delete(id);
    else
      throw Error('Brak implementacji wskazanej metody.');
  }

  protected reloadData(): void {
  }

  protected getDialogConfig(): MatDialogConfig<CrudDialogData> | null {
    return null;
  }

  protected abstract getActionPrefix(): string;

  protected abstract getDialog(type?: ActionType): ComponentType<CrudDialog>;

  protected abstract getDialogData(type?: ActionType, data?: T): Observable<CrudDialogData>;
}
