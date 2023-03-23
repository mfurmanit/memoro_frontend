import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { getCurrentLang } from '@others/helper-functions';
import { bundle } from '@angular-devkit/build-angular/src/builders/browser-esbuild/esbuild';

@Injectable({
  providedIn: 'root'
})
export class MappingService {

  constructor(public translate: TranslateService) {
  }

  getMethod(method: string): (value: any) => string {
    switch (method) {
      case 'boolean': return this.boolean.bind(this);
      case 'simpleValue': return this.simpleValue.bind(this);
      case 'icons': return this.icons.bind(this);
      default: return (value: any) => value.toString();
    }
  }

  private icons(value: string): string {
    return this.translate.instant('icons.' + value);
  }

  private boolean(value: boolean): string {
    return getCurrentLang() === 'pl' ? (value ? 'Tak' : 'Nie') : (value ? 'Yes' : 'No');
  }

  private simpleValue(value: string): string {
    return value;
  }
}
