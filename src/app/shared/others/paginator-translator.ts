import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class MatPaginatorTranslator extends MatPaginatorIntl {
  constructor(private translate: TranslateService) {
    super();
    this.translate.onLangChange.subscribe(() => this.getAndInitTranslations());
    this.getAndInitTranslations();
  }

  override getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) { return `0 z ${length}`; }

    length = Math.max(length, 0);

    const startIndex = page * pageSize;

    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;

    return `${startIndex + 1} - ${endIndex} z ${length}`;
  };

  private getAndInitTranslations(): void {
    this.translate.get([
      'pagination.itemsPerPageLabel',
      'pagination.firstPageLabel',
      'pagination.nextPageLabel',
      'pagination.previousPageLabel',
      'pagination.lastPageLabel'
    ]).subscribe(translations => {
      this.itemsPerPageLabel = translations['pagination.itemsPerPageLabel'];
      this.firstPageLabel = translations['pagination.firstPageLabel'];
      this.nextPageLabel = translations['pagination.nextPageLabel'];
      this.previousPageLabel = translations['pagination.previousPageLabel'];
      this.lastPageLabel = translations['pagination.lastPageLabel'];
      this.changes.next();
    });
  }
}
