import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CardCollection } from '@models/card-collection';
import { BehaviorSubject, combineLatest, Observable, of, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarService } from '@services/snackbar.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CardCollectionService } from '@services/card-collection.service';
import { isNullOrUndefined } from '@others/helper-functions';
import { SortType } from '@models/sort-type';
import { debounceTime, map, startWith } from 'rxjs/operators';
import { mySharingActions, sharingActions, sharingSortTypes } from '@others/constants';
import { CommonAction } from '@models/common-action';
import { fadeInAnimation } from '../../../shared/animations/fade-in.animation';
import { ActionType } from '@enums/action-type';
import { ComponentType } from '@angular/cdk/portal';
import { ConfirmationDialogData, CrudDialog, CrudDialogData } from '@models/crud-dialog';
import { ConfirmationDialogComponent } from '../../../shared/dialogs';
import { CrudHandler } from '@others/crud-handler';
import { ShareDialogComponent } from '../share-dialog/share-dialog.component';

@Component({
  selector: 'app-sharing-page',
  templateUrl: './sharing-page.component.html',
  styleUrls: ['./sharing-page.component.scss'],
  animations: [fadeInAnimation]
})
export class SharingPageComponent extends CrudHandler<CardCollection> implements OnInit {

  form: FormGroup | null = null;

  collections$: Observable<CardCollection[]> | undefined;

  isLoading$ = new BehaviorSubject(true);

  readonly sortTypes: SortType[] = sharingSortTypes;
  readonly sharingActions: CommonAction[] = sharingActions;
  readonly mySharingActions: CommonAction[] = mySharingActions;

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

  share(): void {
    super.onActionClicked({type: ActionType.SHARE});
  }

  actionClicked(action: CommonAction, collection: CardCollection): void {
    super.onActionClicked({type: action.type, element: collection});
  }

  navigate(collection: CardCollection): void {
    this.router.navigate(['collections', collection.id, 'cards', true]);
  }

  protected override reloadData(): void {
    this.loadCollections(this.getSort(), this.getValue());
  }

  protected getActionPrefix(): string {
    return 'collections.actions';
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

    this.collections$ = this.service.getAllShared().pipe(
      map(collections => this.filterCollections(collections, value)),
      map(collections => this.sortCollections(collections, sortType)),
      tap(() => this.isLoading$.next(false))
    );
  }

  private filterCollections(collections: CardCollection[], value?: string | null): CardCollection[] {
    return !isNullOrUndefined(value) ?
      collections.filter(collection => collection.name.includes(value)) : collections;
  }

  private sortCollections(collections: CardCollection[], sortType: SortType = SortType.NONE): CardCollection[] {
    if (sortType === SortType.NONE) {
      return collections;
    }

    const sortTypeString = sortType.toString();
    const underscoreIndex = sortTypeString.lastIndexOf('_');
    const beforeUnderscore = sortTypeString.substring(0, underscoreIndex);
    const sortProperty = beforeUnderscore.toLowerCase().replace(
      /_(\w)/g, (match, letter) => letter.toUpperCase()
    );
    const sortDirection = sortTypeString.substring(underscoreIndex + 1);

    return collections.sort((a, b) => {
      if (sortProperty === 'name') {
        const comparison = a.name.localeCompare(b.name);
        return sortDirection === 'ASC' ? comparison : -comparison;
      }

      if (sortProperty === 'createdDate') {
        const comparison = a.createdDate.getTime() - b.createdDate.getTime();
        return sortDirection === 'ASC' ? comparison : -comparison;
      }

      return 0;
    });
  }

  protected getDialog(type?: ActionType | undefined): ComponentType<CrudDialog> {
    switch (type) {
      case ActionType.SAVE:
      case ActionType.STOP_SHARING:
        return ConfirmationDialogComponent;
      case ActionType.SHARE:
        return ShareDialogComponent;
      default:
        throw Error('Brak implementacji wskazanej metody.');
    }
  }

  protected getDialogData(type?: ActionType | undefined, data?: CardCollection | undefined): Observable<CrudDialogData> {
    return of(this.resolveDialogData(type, data));
  }

  private resolveDialogData(type?: ActionType | undefined, data?: CardCollection | undefined): CrudDialogData {
    switch (type) {
      case ActionType.SAVE:
        return {
          header: 'collections.dialog.saveHeader',
          content: 'collections.dialog.saveMessage',
        } as ConfirmationDialogData;
      case ActionType.STOP_SHARING:
        return {
          header: 'collections.dialog.stopSharingHeader',
          content: 'collections.dialog.stopSharingMessage',
        } as ConfirmationDialogData;
      case ActionType.SHARE:
        return null;
      default:
        throw Error('Brak implementacji wskazanej metody.');
    }
  }

  protected override getMethod(type: ActionType, data?: CardCollection, id?: string): Observable<CardCollection | void> {
    if (type === ActionType.SHARE && !isNullOrUndefined(data))
      return this.service.share(data.id);
    else if (type === ActionType.SAVE && !isNullOrUndefined(id))
      return this.service.save(id);
    else if (type === ActionType.STOP_SHARING && !isNullOrUndefined(id))
      return this.service.stopSharing(id);
    else throw Error('Brak implementacji wskazanej metody.');
  }

  private getSort(): SortType {
    if (!isNullOrUndefined(this.form)) return this.form.controls['sort'].value;
    else return SortType.NONE;
  }

  private getValue(): string | null {
    if (!isNullOrUndefined(this.form)) return this.form.controls['value'].value;
    else return null;
  }
}
