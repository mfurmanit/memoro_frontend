import { Component, Input } from '@angular/core';
import { LearningService } from '@services/learning.service';
import { Observable, share } from 'rxjs';
import { Card } from '@models/card';
import { BaseComponent } from '@components/base/base.component';
import { Answer } from '@enums/answer';
import { LearningMode } from '@enums/learning-mode';
import { StateService } from '@services/state.service';
import { isNullOrUndefined } from '@others/helper-functions';

@Component({
  selector: 'app-learning-container',
  templateUrl: './learning-container.component.html',
  styleUrls: ['./learning-container.component.scss']
})
export class LearningContainerComponent extends BaseComponent {

  @Input() set collectionId(collectionId: string | null) {
    if (!isNullOrUndefined(collectionId)) this.card$ = this.service.start(collectionId);
  };

  card$: Observable<Card> | undefined;
  state$: Observable<boolean>;

  readonly mode: LearningMode = LearningMode.LEARNING;
  readonly answers: Answer[] = Object.values(Answer);

  constructor(private service: LearningService,
              private stateService: StateService) {
    super();
    this.state$ = this.stateService.activeChanged.asObservable().pipe(share());
  }

  answerCard(cardId: string, answer: Answer): void {
    this.card$ = this.service.answer({cardId, answer});
  }
}
