import { CollectionDialogComponent } from '../../modules/collections/collection-dialog/collection-dialog.component';
import { CardCollection } from '@models/card-collection';
import { ConfirmationDialogComponent } from '../../shared/dialogs';
import { Card } from '@models/card';
import { CardDialogComponent } from '../../modules/collections/card-dialog/card-dialog.component';
import { ShareDialogComponent } from '../../modules/sharing/share-dialog/share-dialog.component';

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

export interface CardDialogData {
  card?: Card;
  collectionId: string | null;
}

export interface ConfirmationDialogData extends SharedDialogData {
  content: string;
}

export type CrudDialog = CollectionDialogComponent | CardDialogComponent | ConfirmationDialogComponent | ShareDialogComponent;
export type CrudDialogData = CollectionDialogData | CardDialogData | ConfirmationDialogData | null;
