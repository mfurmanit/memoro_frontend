import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { getCurrentLang } from '@others/helper-functions';
import { bundle } from '@angular-devkit/build-angular/src/builders/browser-esbuild/esbuild';
import { CardCollection } from '@models/card-collection';
import { SortType } from '@models/sort-type';
import { CardSide } from '@models/card-side';

@Injectable({
  providedIn: 'root'
})
export class MappingService {

  constructor(public translate: TranslateService) {
  }

  getMethod(method: string): (value: any) => string {
    switch (method) {
      case 'boolean': return this.boolean.bind(this);
      case 'collection': return this.collection.bind(this);
      case 'simpleValue': return this.simpleValue.bind(this);
      case 'sortType': return this.sortType.bind(this);
      case 'side': return this.side.bind(this);
      case 'icons': return this.icons.bind(this);
      default: return (value: any) => value.toString();
    }
  }

  private collection(value: CardCollection): string {
    return value && value.name;
  }

  private icons(value: string): string {
    return this.translate.instant('icons.' + value);
  }

  private boolean(value: boolean): string {
    return getCurrentLang() === 'pl' ? (value ? 'Tak' : 'Nie') : (value ? 'Yes' : 'No');
  }

  private sortType(value: SortType): string {
    return this.translate.instant('sortTypes.' + value);
  }

  private side(value: CardSide): string {
    return this.translate.instant('sides.' + value);
  }

  private simpleValue(value: string): string {
    return value;
  }
}
