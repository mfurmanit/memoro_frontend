import { Component, OnInit } from '@angular/core';
import { LearningMode } from '@enums/learning-mode';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { SortType } from '@models/sort-type';
import { cardsSortTypes } from '@others/constants';
import { isCardCollection, isNullOrUndefined } from '@others/helper-functions';
import { BrowsingState } from '@models/browsing-state';
import { BaseComponent } from '@components/base/base.component';
import { CardCollectionService } from '@services/card-collection.service';
import { HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CardCollection } from '@models/card-collection';
import { LearningService } from '@services/learning.service';

@Component({
  selector: 'app-learning-page',
  templateUrl: './learning-page.component.html',
  styleUrls: ['./learning-page.component.scss']
})
export class LearningPageComponent extends BaseComponent implements OnInit {

  form: FormGroup | null = null;
  collectionId: string | null = null;
  state: BrowsingState | undefined;
  mode: LearningMode = LearningMode.NONE;

  readonly sortTypes: SortType[] = cardsSortTypes;
  readonly LearningMode = LearningMode;

  constructor(private formBuilder: FormBuilder,
              private learningService: LearningService,
              private collectionService: CardCollectionService) {
    super();
  }

  ngOnInit(): void {
    this.initForm();
    this.initListeners();
    this.getCollections = this.getCollections.bind(this);
  }

  startLearning(): void {
    this.mode = LearningMode.LEARNING;
    this.state = undefined;
  }

  getCollections(value: string): Observable<CardCollection[]> {
    return this.collectionService.getAll(this.prepareParams(value)).pipe(map(value => value.content));
  }

  private prepareParams(search: string): HttpParams {
    let params = new HttpParams()
      .set('page', '0')
      .set('size', '20');

    if (!isNullOrUndefined(search)) params = params.append('value', search);

    return params;
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      collection: null,
      sort: [SortType.NONE, Validators.required]
    });
  }

  private listenForCollectionChanges(): void {
    this.subscriptions.add(
      this.getCollectionObservable().subscribe(collection => {
        if (isCardCollection(collection)) {
          this.collectionId = collection.id;
          if (this.mode !== LearningMode.LEARNING) this.changeState(this.getSort());
        } else this.collectionId = null;
      })
    );
  }

  private listenForSortChanges(): void {
    this.subscriptions.add(
      this.getSortObservable().subscribe(sort => this.changeState(sort))
    );
  }

  private initListeners(): void {
    if (!isNullOrUndefined(this.form)) {
      this.listenForCollectionChanges();
      this.listenForSortChanges();
    }
  }

  private getCollectionObservable(): Observable<CardCollection> {
    return this.form!.controls['collection'].valueChanges;
  }

  private getSortObservable(): Observable<SortType> {
    return this.form!.controls['sort'].valueChanges;
  }

  private getSort(): SortType {
    if (!isNullOrUndefined(this.form)) return this.form.controls['sort'].value;
    else return SortType.NONE;
  }

  private changeState(sort: SortType = SortType.NONE): void {
    if (this.mode === LearningMode.LEARNING)
      this.subscriptions.add(this.learningService.stop().subscribe(() => this.updateState(sort)));
    else this.updateState(sort);
  }

  private updateState(sort: SortType = SortType.NONE): void {
    this.mode = LearningMode.BROWSING;
    if (!isNullOrUndefined(this.collectionId)) {
      this.state = {
        sort, collectionId: this.collectionId
      };
    }
  }
}
