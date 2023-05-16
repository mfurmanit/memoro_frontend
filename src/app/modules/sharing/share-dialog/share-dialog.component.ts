import { Component, OnInit } from '@angular/core';
import { CardCollection } from '@models/card-collection';
import { Observable } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CardCollectionService } from '@services/card-collection.service';
import { isNullOrUndefined } from '@others/helper-functions';
import { map } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';
import { selectedValidator } from '@others/validators';

@Component({
  selector: 'app-sharing-page',
  templateUrl: './share-dialog.component.html',
  styleUrls: ['./share-dialog.component.scss']
})
export class ShareDialogComponent implements OnInit {

  form: FormGroup = new FormGroup({
    collection: new FormControl<CardCollection | null>(null, [
      Validators.required, selectedValidator('collectionNotSelected', true)
    ])
  });

  constructor(private collectionService: CardCollectionService,
              private dialogRef: MatDialogRef<ShareDialogComponent>) {
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
      .set('size', '20')
      .set('omitShared', 'true');

    if (!isNullOrUndefined(search)) params = params.append('value', search);

    return params;
  }

  closeDialog(): void {
    if (isNullOrUndefined(this.form)) return;
    this.form.markAllAsTouched();
    if (this.form.valid) this.dialogRef.close(this.form.value.collection);
  }
}
