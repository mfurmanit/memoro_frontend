import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CollectionDialogData } from '@models/crud-dialog';
import { isNullOrUndefined } from '@others/helper-functions';
import { materialIcons } from '@others/material-icons';

@Component({
  selector: 'app-collection-dialog',
  templateUrl: './collection-dialog.component.html',
  styleUrls: ['./collection-dialog.component.scss']
})
export class CollectionDialogComponent implements OnInit {

  editMode: boolean = false;
  form: FormGroup | null = null;
  readonly icons = materialIcons;

  constructor(private formBuilder: FormBuilder,
              private dialogRef: MatDialogRef<CollectionDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: CollectionDialogData) {
  }

  ngOnInit(): void {
    this.initForm();
    this.patchData();
  }

  closeDialog(): void {
    if (isNullOrUndefined(this.form)) return;
    this.form.markAllAsTouched();
    if (this.form.valid) this.dialogRef.close(this.form.value);
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      id: [null],
      name: [null, Validators.required],
      icon: [null, Validators.required],
    });
  }

  private patchData(): void {
    if (!isNullOrUndefined(this.data) && !isNullOrUndefined(this.data.cardCollection) && !isNullOrUndefined(this.form)) {
      this.form.patchValue(this.data.cardCollection);
      this.editMode = true;
    }
  }
}
