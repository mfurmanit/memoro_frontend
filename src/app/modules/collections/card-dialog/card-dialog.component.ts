import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CardDialogData } from '@models/crud-dialog';
import { isNullOrUndefined } from '@others/helper-functions';
import { CardCollectionService } from '@services/card-collection.service';

@Component({
  selector: 'app-card-dialog',
  templateUrl: './card-dialog.component.html',
  styleUrls: ['./card-dialog.component.scss']
})
export class CardDialogComponent implements OnInit {

  editMode: boolean = false;
  form: FormGroup | null = null;

  constructor(private formBuilder: FormBuilder,
              private service: CardCollectionService,
              private dialogRef: MatDialogRef<CardDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: CardDialogData) {
  }

  ngOnInit(): void {
    this.initForm();
    this.patchData();
  }

  closeDialog(): void {
    if (isNullOrUndefined(this.form)) return;
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const value = this.form.getRawValue();
      this.dialogRef.close(value);
    }
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      id: [null],
      front: [null, Validators.required],
      back: [null, Validators.required],
      favorite: [false, Validators.required],
      collectionId: [null, Validators.required]
    });
  }

  private patchData(): void {
    if (!isNullOrUndefined(this.data) && !isNullOrUndefined(this.data.card) && !isNullOrUndefined(this.form)) {
      this.form.patchValue(this.data.card);
      this.editMode = true;
    }

    if (!isNullOrUndefined(this.data) && !isNullOrUndefined(this.data.collectionId) && !isNullOrUndefined(this.form))
      this.form.controls['collectionId'].patchValue(this.data.collectionId);
  }
}
