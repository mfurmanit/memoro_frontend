import { Component, OnInit, ViewChild } from '@angular/core';
import { CardCollection } from '@models/card-collection';
import { CommonAction } from '@models/common-action';
import { ActionType } from '@enums/action-type';
import { CrudHandler } from '@others/crud-handler';
import { ComponentType } from '@angular/cdk/portal';
import { CollectionDialogData, ConfirmationDialogData, CrudDialog, CrudDialogData } from '@models/crud-dialog';
import { combineLatest, Observable, of } from 'rxjs';
import { CollectionDialogComponent } from '../collection-dialog/collection-dialog.component';
import { SnackbarService } from '@services/snackbar.service';
import { MatDialog } from '@angular/material/dialog';
import { CardCollectionService } from '@services/card-collection.service';
import { HttpParams } from '@angular/common/http';
import { emptyPage, Page } from '@models/page';
import { ConfirmationDialogComponent } from '../../../shared/dialogs';
import { Router } from '@angular/router';
import { SortType } from '@models/sort-type';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { isNullOrUndefined } from '@others/helper-functions';
import { debounceTime, startWith } from 'rxjs/operators';
import { collectionsActions, collectionsSortTypes } from '@others/constants';

@Component({
  selector: 'app-collections',
  templateUrl: './collections-page.component.html',
  styleUrls: ['./collections-page.component.scss']
})
export class CollectionsPageComponent extends CrudHandler<CardCollection> implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 20, 50];

  form: FormGroup | null = null;
  collections$: Observable<Page<CardCollection>> = of(emptyPage<CardCollection>());

  readonly sortTypes: SortType[] = collectionsSortTypes;
  readonly actions: CommonAction[] = collectionsActions;

  constructor(private router: Router,
              private dialog: MatDialog,
              private snackbar: SnackbarService,
              private formBuilder: FormBuilder,
              private service: CardCollectionService) {
    super(service, dialog, snackbar);
  }

  ngOnInit(): void {
    this.initForm();
    this.initListeners();
  }

  onPageChanged(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.reloadData();
  }

  create(): void {
    super.onActionClicked({type: ActionType.CREATE});
  }

  navigate(collection: CardCollection): void {
    this.router.navigate(['collections', collection.id, 'cards']);
  }

  actionClicked(action: CommonAction, collection: CardCollection): void {
    switch (action.type) {
      case ActionType.CREATE_CARD:
        // TODO: Navigate to cards component and open dialog
        break;
      case ActionType.LEARN:
        this.router.navigate(['learning']);
        break;
      case ActionType.SHARE:
        // TODO: Implement share logic
        break;
      default:
        super.onActionClicked({type: action.type, element: collection});
        break;
    }
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      value: [''],
      sort: [SortType.NONE, Validators.required]
    });
  }

  private initListeners(): void {
    if (!isNullOrUndefined(this.form))
      this.subscriptions.add(
        combineLatest([this.getValueObservable(), this.getSortObservable()])
          .subscribe(([value, sort]) => this.loadCollections(sort, value))
      );
  }

  private getSortObservable(): Observable<SortType> {
    return this.form!.controls['sort'].valueChanges.pipe(
      startWith(SortType.NONE)
    );
  }

  private getValueObservable(): Observable<string> {
    return this.form!.controls['value'].valueChanges.pipe(
      startWith(''),
      debounceTime(300)
    );
  }

  private loadCollections(sortType: SortType = SortType.NONE, value?: string | null): void {
    let params = new HttpParams()
      .set('page', this.pageIndex)
      .set('size', this.pageSize);

    params = this.applySort(sortType, params);
    if (!isNullOrUndefined(value)) params = params.set('value', value);

    this.collections$ = this.service.getAll(params);
  }

  private applySort(sortType: SortType = SortType.NONE, params: HttpParams): HttpParams {
    if (sortType !== SortType.NONE) {
      const sortTypeString = sortType.toString();
      const underscoreIndex = sortTypeString.lastIndexOf('_');
      const beforeUnderscore = sortTypeString.substring(0, underscoreIndex);
      const sortParameter = beforeUnderscore.toLowerCase().replace(
        /_(\w)/g, (match, letter) => letter.toUpperCase()
      );
      const sortDirection = sortTypeString.substring(underscoreIndex + 1);
      params = params.set('sort', sortParameter + ',' + sortDirection);
    }
    return params;
  }

  protected override reloadData(): void {
    this.loadCollections(this.getSort(), this.getValue());
  }

  private getSort(): SortType {
    if (!isNullOrUndefined(this.form)) return this.form.controls['sort'].value;
    else return SortType.NONE;
  }

  private getValue(): string | null {
    if (!isNullOrUndefined(this.form)) return this.form.controls['value'].value;
    else return null;
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

