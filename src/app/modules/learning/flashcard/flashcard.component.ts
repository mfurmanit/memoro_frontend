import { Component, Input, OnInit } from '@angular/core';
import { Card } from '@models/card';
import { LearningMode } from '@enums/learning-mode';
import { StateService } from '@services/state.service';
import { BaseComponent } from '@components/base/base.component';

@Component({
  selector: 'app-flashcard',
  templateUrl: './flashcard.component.html',
  styleUrls: ['./flashcard.component.scss']
})
export class FlashcardComponent extends BaseComponent implements OnInit {

  @Input() card: Card | undefined;
  @Input() mode: LearningMode | undefined;

  isActive: boolean = false;

  constructor(private stateService: StateService) {
    super();
  }

  ngOnInit(): void {
    this.listenForActive();
  }

  listenForActive(): void {
    this.subscriptions.add(
      this.stateService.activeChanged.asObservable()
        .subscribe(isActive => this.isActive = isActive)
    );
  }

  rotateCard(): void {
    const stopRotation = this.isActive && this.mode === LearningMode.LEARNING;
    if (!stopRotation) {
      this.isActive = !this.isActive;
      this.stateService.activeChanged.next(this.isActive);
    }
  }
}
