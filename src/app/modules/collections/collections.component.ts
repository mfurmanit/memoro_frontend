import { Component, OnInit } from '@angular/core';
import { CardCollection } from '@models/card-collection';
import { CommonAction } from '@models/common-action';
import { ActionType } from '@enums/action-type';
import { CrudHandler } from '@others/crud-handler';
import { ComponentType } from '@angular/cdk/portal';
import { CollectionDialogData, ConfirmationDialogData, CrudDialog, CrudDialogData } from '@models/crud-dialog';
import { Observable, of } from 'rxjs';
import { CollectionDialogComponent } from './collection-dialog/collection-dialog.component';
import { SnackbarService } from '@services/snackbar.service';
import { MatDialog } from '@angular/material/dialog';
import { CardCollectionService } from '@services/card-collection.service';
import { HttpParams } from '@angular/common/http';
import { emptyPage, Page } from '@models/page';
import { ConfirmationDialogComponent } from '../../shared/dialogs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss']
})
export class CollectionsComponent extends CrudHandler<CardCollection> implements OnInit {

  collections$: Observable<Page<CardCollection>> = of(emptyPage<CardCollection>());

  readonly actions: CommonAction[] = [
    {type: ActionType.EDIT, icon: 'edit'},
    {type: ActionType.DELETE, icon: 'delete'},
    {type: ActionType.LEARN, icon: 'school'},
    {type: ActionType.SHARE, icon: 'share'}
  ];

  constructor(private router: Router,
              private dialog: MatDialog,
              private snackbar: SnackbarService,
              private service: CardCollectionService) {
    super(service, dialog, snackbar);
  }

  ngOnInit(): void {
    this.loadCollections();
  }

  actionClicked(action: CommonAction, collection: CardCollection): void {
    switch (action.type) {
      case ActionType.LEARN:
        this.router.navigate(['learning']);
        break;
      case ActionType.SHARE:
        console.log('SHARE LOGIC');
        break;
      default:
        super.onActionClicked({type: action.type, element: collection});
        break;
    }
  }

  create(): void {
    super.onActionClicked({type: ActionType.CREATE});
  }

  private loadCollections(): void {
    const params = new HttpParams();
    params.append('page', '0');
    params.append('size', '1000');
    this.collections$ = this.service.getAll(params);
  }

  protected override reloadData(): void {
    const params = new HttpParams();
    params.append('page', '0');
    params.append('size', '1000');
    this.collections$ = this.service.getAll(params);
  }

  protected getActionPrefix(): string {
    return 'collections.actions';
  }

  protected getDialog(type?: ActionType | undefined): ComponentType<CrudDialog> {
    return type === ActionType.DELETE ? ConfirmationDialogComponent : CollectionDialogComponent;
  }

  protected getDialogData(type?: ActionType | undefined, data?: CardCollection | undefined): Observable<CrudDialogData> {
    return of(
      type === ActionType.DELETE ? {
        header: 'collections.dialog.deleteHeader',
        content: 'collections.dialog.deleteMessage',
      } as ConfirmationDialogData : {
        cardCollection: data
      } as CollectionDialogData
    );
  }
}

