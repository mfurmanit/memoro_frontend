import { Component } from '@angular/core';
import { fadeAnimation } from './shared/animations/fade.animation';
import { TranslateService } from '@ngx-translate/core';
import { initTranslateService } from '@others/helper-functions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeAnimation]
})
export class AppComponent {
  title = 'memoro';

  constructor(private translateService: TranslateService) {
    initTranslateService(translateService);
  }
}
