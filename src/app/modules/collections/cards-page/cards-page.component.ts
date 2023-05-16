import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, of, tap } from 'rxjs';
import { Page } from '@models/page';
import { CommonAction } from '@models/common-action';
import { ActionType } from '@enums/action-type';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarService } from '@services/snackbar.service';
import { HttpParams } from '@angular/common/http';
import { ComponentType } from '@angular/cdk/portal';
import { ConfirmationDialogData, CrudDialog, CrudDialogData } from '@models/crud-dialog';
import { ConfirmationDialogComponent } from '../../../shared/dialogs';
import { CrudHandler } from '@others/crud-handler';
import { Card } from '@models/card';
import { CardService } from '@services/card.service';
import { debounceTime, startWith } from 'rxjs/operators';
import { CardDialogComponent } from '../card-dialog/card-dialog.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SortType } from '@models/sort-type';
import { isNullOrUndefined } from '@others/helper-functions';
import { cardsActions, cardsSortTypes } from '@others/constants';
import { CardSide } from '@models/card-side';
import { fadeInAnimation } from '../../../shared/animations/fade-in.animation';

@Component({
  selector: 'app-cards',
  templateUrl: './cards-page.component.html',
  styleUrls: ['./cards-page.component.scss'],
  animations: [fadeInAnimation]
})
export class CardsPageComponent extends CrudHandler<Card> implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 20, 50];

  form: FormGroup | null = null;
  collectionId: string | null = null;
  isShared: boolean = true;
  isLoading$ = new BehaviorSubject(true);
  cards$: Observable<Page<Card>> | undefined;
  onlyFavorites: boolean = false;

  readonly sortTypes: SortType[] = cardsSortTypes;
  readonly sides: CardSide[] = Object.values(CardSide);
  readonly actions: CommonAction[] = cardsActions;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private dialog: MatDialog,
              private formBuilder: FormBuilder,
              private snackbar: SnackbarService,
              private service: CardService) {
    super(service, dialog, snackbar);
  }

  ngOnInit(): void {
    this.initForm();
    this.resolveCollectionId();
  }

  onPageChanged(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.reloadData();
  }

  create(): void {
    super.onActionClicked({type: ActionType.CREATE});
  }

  actionClicked(action: CommonAction, collection: Card): void {
    switch (action.type) {
      case ActionType.MARK_AS_FAVORITE:
        this.markAsFavorite(collection.id);
        break;
      default:
        super.onActionClicked({type: action.type, element: collection});
        break;
    }
  }

  changeFavorites(): void {
    this.onlyFavorites = !this.onlyFavorites;
    this.reloadData();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      value: [''],
      side: [CardSide.FRONT],
      sort: [SortType.NONE, Validators.required]
    });
  }

  private markAsFavorite(id: string): void {
    this.subscriptions.add(
      this.service.markAsFavorite(id)
        .subscribe(() => this.handleActionSuccess(ActionType.MARK_AS_FAVORITE))
    );
  }

  private resolveCollectionId(): void {
    this.subscriptions.add(this.route.paramMap.subscribe(params => {
      this.collectionId = params.get('id');
      this.isShared = (params.get('shared') === 'true');
      this.initListeners();
    }));
  }

  private initListeners(): void {
    if (!isNullOrUndefined(this.form))
      this.subscriptions.add(
        combineLatest([
          this.getValueObservable(), this.getSortObservable(), this.getSideObservable()
        ]).subscribe(([value, sort, side]) => this.loadCards(sort, side, value))
      );
  }

  private getSideObservable(): Observable<CardSide> {
    return this.form!.controls['side'].valueChanges.pipe(
      startWith(CardSide.FRONT)
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

  private loadCards(sortType: SortType = SortType.NONE,
                    side: CardSide = CardSide.FRONT,
                    value?: string | null): void {
    this.isLoading$.next(true);

    let params = new HttpParams()
      .set('page', this.pageIndex)
      .set('size', this.pageSize)
      .set('side', side);

    if (this.onlyFavorites) params = params.set('onlyFavorites', true);
    if (!isNullOrUndefined(this.collectionId)) params = params.append('id', this.collectionId);
    if (!isNullOrUndefined(value)) params = params.set('value', value);
    params = this.applySort(sortType, params);

    this.cards$ = this.service.getAll(params).pipe(
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
    this.loadCards(this.getSort(), this.getSide(), this.getValue());
  }

  private getSide(): CardSide {
    if (!isNullOrUndefined(this.form)) return this.form.controls['side'].value;
    else return CardSide.FRONT;
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
    return 'cards.actions';
  }

  protected getDialog(type?: ActionType | undefined): ComponentType<CrudDialog> {
    return type === ActionType.DELETE ? ConfirmationDialogComponent : CardDialogComponent;
  }

  protected getDialogData(type?: ActionType | undefined, data?: Card | undefined): Observable<CrudDialogData> {
    switch (type) {
      case ActionType.DELETE:
        return of({
            header: 'cards.dialog.deleteHeader',
            content: 'cards.dialog.deleteMessage',
          } as ConfirmationDialogData
        );
      case ActionType.CREATE:
        return of({collectionId: this.collectionId});
      default:
        return of({
          card: data,
          collectionId: null
        });
    }
  }
}
