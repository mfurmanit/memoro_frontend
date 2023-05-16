import { Component, OnInit, ViewChild } from '@angular/core';
import { CardCollection } from '@models/card-collection';
import { CommonAction } from '@models/common-action';
import { ActionType } from '@enums/action-type';
import { CrudHandler } from '@others/crud-handler';
import { ComponentType } from '@angular/cdk/portal';
import { CollectionDialogData, ConfirmationDialogData, CrudDialog, CrudDialogData } from '@models/crud-dialog';
import { BehaviorSubject, combineLatest, Observable, of, tap } from 'rxjs';
import { CollectionDialogComponent } from '../collection-dialog/collection-dialog.component';
import { SnackbarService } from '@services/snackbar.service';
import { MatDialog } from '@angular/material/dialog';
import { CardCollectionService } from '@services/card-collection.service';
import { HttpParams } from '@angular/common/http';
import { Page } from '@models/page';
import { ConfirmationDialogComponent } from '../../../shared/dialogs';
import { Router } from '@angular/router';
import { SortType } from '@models/sort-type';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { isNullOrUndefined } from '@others/helper-functions';
import { debounceTime, startWith } from 'rxjs/operators';
import { collectionActions, collectionsSortTypes, sharedCollectionActions } from '@others/constants';
import { fadeInAnimation } from '../../../shared/animations/fade-in.animation';

// TODO: Extract shared logic to separate component

@Component({
  selector: 'app-collections',
  templateUrl: './collections-page.component.html',
  styleUrls: ['./collections-page.component.scss'],
  animations: [fadeInAnimation]
})
export class CollectionsPageComponent extends CrudHandler<CardCollection> implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 20, 50];

  form: FormGroup | null = null;
  isLoading$ = new BehaviorSubject(true);
  collections$: Observable<Page<CardCollection>> | undefined;

  readonly sortTypes: SortType[] = collectionsSortTypes;
  readonly collectionActions: CommonAction[] = collectionActions;
  readonly sharedCollectionActions: CommonAction[] = sharedCollectionActions;

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
    this.router.navigate(['collections', collection.id, 'cards', false]);
  }

  actionClicked(action: CommonAction, collection: CardCollection): void {
    super.onActionClicked({type: action.type, element: collection});
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
    this.isLoading$.next(true);

    let params = new HttpParams()
      .set('page', this.pageIndex)
      .set('size', this.pageSize);

    params = this.applySort(sortType, params);
    if (!isNullOrUndefined(value)) params = params.set('value', value);

    this.collections$ = this.service.getAll(params).pipe(
      tap(() => this.isLoading$.next(false))
    );
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
    switch (type) {
      case ActionType.DELETE:
        return ConfirmationDialogComponent;
      case ActionType.SHARE:
        return ConfirmationDialogComponent;
      default:
        return CollectionDialogComponent;
    }
  }

  protected getDialogData(type?: ActionType | undefined, data?: CardCollection | undefined): Observable<CrudDialogData> {
    return of(this.resolveDialogData(type, data));
  }

  private resolveDialogData(type?: ActionType | undefined, data?: CardCollection | undefined): CrudDialogData {
    switch (type) {
      case ActionType.DELETE:
        return {
          header: 'collections.dialog.deleteHeader',
          content: 'collections.dialog.deleteMessage',
        } as ConfirmationDialogData;
      case ActionType.SHARE:
        return {
          header: 'collections.dialog.shareHeader',
          content: 'collections.dialog.shareMessage',
        } as ConfirmationDialogData;
      default:
        return {
          cardCollection: data
        } as CollectionDialogData;
    }
  }

  protected override getMethod(type: ActionType, data?: CardCollection, id?: string): Observable<CardCollection | void> {
    if (type === ActionType.SHARE && !isNullOrUndefined(id)) {
      console.log('ssss');
      return this.service.share(id);
    } else return super.getMethod(type, data, id);
  }
}
