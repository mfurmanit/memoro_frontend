import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CardCollection } from '@models/card-collection';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CardCollectionService } from '@services/card-collection.service';
import { isNullOrUndefined } from '@others/helper-functions';
import { map } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-sharing-page',
  templateUrl: './share-dialog.component.html',
  styleUrls: ['./share-dialog.component.scss']
})
export class ShareDialogComponent implements OnInit {

  form: FormGroup = new FormGroup({
    collection: new FormControl<CardCollection | null>(null, Validators.required)
  });

  constructor(private router: Router,
              private dialog: MatDialog,
              private collectionService: CardCollectionService) {
  }

  ngOnInit(): void {
    this.getCollections = this.getCollections.bind(this);
  }

  getCollections(value: string): Observable<CardCollection[]> {
    return this.collectionService.getAll(this.prepareParams(value)).pipe(map(value => value.content));
  }

  prepareParams(search: string): HttpParams {
    let params = new HttpParams()
      .set('page', '0')
      .set('size', '20');

    if (!isNullOrUndefined(search)) params = params.append('value', search);

    return params;
  }
}
