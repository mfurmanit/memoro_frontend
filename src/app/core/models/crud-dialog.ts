import { CollectionDialogComponent } from '../../modules/collections/collection-dialog/collection-dialog.component';
import { CardCollection } from '@models/card-collection';
import { ConfirmationDialogComponent } from '../../shared/dialogs';

export interface SharedDialogData {
  content: string;
  header: string;
  okButtonText?: string;
  declineButtonText?: string;
  disableClose?: boolean;
  width?: string;
}

export interface CollectionDialogData {
  cardCollection?: CardCollection;
}

export interface ConfirmationDialogData extends SharedDialogData {
  content: string;
}

export type CrudDialog = CollectionDialogComponent | ConfirmationDialogComponent;
export type CrudDialogData = CollectionDialogData | ConfirmationDialogData;
