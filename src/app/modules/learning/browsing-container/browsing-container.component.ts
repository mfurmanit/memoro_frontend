import { Component, Input } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { emptyPage, Page } from '@models/page';
import { Card } from '@models/card';
import { LearningMode } from '@enums/learning-mode';
import { CardService } from '@services/card.service';
import { BaseComponent } from '@components/base/base.component';
import { SortType } from '@models/sort-type';
import { HttpParams } from '@angular/common/http';
import { isNullOrUndefined } from '@others/helper-functions';
import { BrowsingState } from '@models/browsing-state';
import { StateService } from '@services/state.service';

@Component({
  selector: 'app-browsing-container',
  templateUrl: './browsing-container.component.html',
  styleUrls: ['./browsing-container.component.scss']
})
export class BrowsingContainerComponent extends BaseComponent {

  @Input() set state(state: BrowsingState | undefined) {
    if (!isNullOrUndefined(state)) {
      this.pages = 0;
      this.currentState = state;
      this.reloadCards();
    }
  };

  currentState: BrowsingState | undefined;
  cards: Card[] = [];
  cardNumber: number = 0;
  isActive: boolean = false;
  pages: number = 0; // TODO replace with one object maybe ?

  cards$: Observable<Page<Card>> = of(emptyPage<Card>());
  readonly mode: LearningMode = LearningMode.BROWSING;
  readonly pageSize: number = 20;

  constructor(private service: CardService,
              private stateService: StateService) {
    super();
    this.listenForActive();
  }

  private loadCards(): Observable<Card[]> {
    let params = new HttpParams()
      .set('page', this.pages)
      .set('size', '20');

    if (!isNullOrUndefined(this.currentState)) {
      console.log(this.currentState);
      params = params.append('id', this.currentState.collectionId);
      params = this.applySort(this.currentState.sort, params);
    }

    return this.service.getAll(params).pipe(map(page => page.content));
  }

  private reloadCards(): void {
    this.cards = [];
    this.appendCards();
  }

  private appendCards(): void {
    this.subscriptions.add(this.loadCards().subscribe(cards => this.cards = cards));
  }

  listenForActive(): void {
    this.subscriptions.add(this.stateService.activeChanged.asObservable().subscribe(
      a => this.isActive = a
    ))
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

  decrement(): void {
    if (this.isActive) {
      this.stateService.activeChanged.next(false);
      setTimeout(() => this.cardNumber--, 150);
    } else this.cardNumber--;
  }

  increment(): void {
    if (this.isActive) {
      this.stateService.activeChanged.next(false);
      setTimeout(() => this.cardNumber++, 150);
    } else this.cardNumber++;
    this.checkPage();
  }

  private checkPage(): void {
    if (this.cardNumber >= (this.pageSize - 5)) {
      this.pages++;
      this.appendCards();
    }
  }
}
