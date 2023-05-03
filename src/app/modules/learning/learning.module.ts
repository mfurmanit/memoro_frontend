import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LearningRoutingModule } from './learning-routing.module';
import { LearningPageComponent } from './learning-page/learning-page.component';
import { SharedModule } from '@shared.module';
import { FlashcardComponent } from './flashcard/flashcard.component';
import { LearningContainerComponent } from './learning-container/learning-container.component';
import { BrowsingContainerComponent } from './browsing-container/browsing-container.component';

@NgModule({
  declarations: [
    LearningPageComponent,
    FlashcardComponent,
    LearningContainerComponent,
    BrowsingContainerComponent
  ],
  imports: [
    CommonModule,
    LearningRoutingModule,
    SharedModule
  ]
})
export class LearningModule {
}
