import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CardCollection, SharedCardCollection } from '@models/card-collection';
import { BehaviorSubject, combineLatest, Observable, of, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarService } from '@services/snackbar.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CardCollectionService } from '@services/card-collection.service';
import { isNullOrUndefined } from '@others/helper-functions';
import { SortType } from '@models/sort-type';
import { debounceTime, map, startWith } from 'rxjs/operators';
import { sharingActions, sharingSortTypes } from '@others/constants';
import { CommonAction } from '@models/common-action';
import { fadeInAnimation } from '../../../shared/animations/fade-in.animation';
import { ActionType } from '@enums/action-type';
import { ComponentType } from '@angular/cdk/portal';
import { CollectionDialogData, ConfirmationDialogData, CrudDialog, CrudDialogData } from '@models/crud-dialog';
import { ConfirmationDialogComponent } from '../../../shared/dialogs';
import { CollectionDialogComponent } from '../../collections/collection-dialog/collection-dialog.component';
import { CrudHandler } from '@others/crud-handler';

@Component({
  selector: 'app-sharing-page',
  templateUrl: './sharing-page.component.html',
  styleUrls: ['./sharing-page.component.scss'],
  animations: [fadeInAnimation]
})
export class SharingPageComponent extends CrudHandler<CardCollection> implements OnInit {

  form: FormGroup | null = null;

  collections$: Observable<SharedCardCollection[]> | undefined;

  isLoading$ = new BehaviorSubject(true);

  readonly sortTypes: SortType[] = sharingSortTypes;
  readonly actions: CommonAction[] = sharingActions;

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

  }

  actionClicked(action: CommonAction, collection: CardCollection): void {
    console.log('aa');
  }

  navigate(collection: CardCollection): void {
    console.log('navigate');
    // TODO: Navigate properly
  }

  protected getActionPrefix(): string {
    throw new Error('Method not implemented.');
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

  private filterCollections(collections: SharedCardCollection[], value?: string | null): SharedCardCollection[] {
    return !isNullOrUndefined(value) ?
      collections.filter(collection => collection.name.includes(value)) : collections;
  }

  private sortCollections(collections: SharedCardCollection[], sortType: SortType = SortType.NONE): SharedCardCollection[] {
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
