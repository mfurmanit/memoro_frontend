import { Injectable } from '@angular/core';
import { MissingTranslationHandler, MissingTranslationHandlerParams } from '@ngx-translate/core';

@Injectable()
export class HttpMissingTranslationHandler extends MissingTranslationHandler {

  constructor() {
    super();
  }

  error(params: MissingTranslationHandlerParams): void {
    console.error('Missing translation', params);
  }

  handle(params: MissingTranslationHandlerParams): any {
    this.error(params);
  }
}
