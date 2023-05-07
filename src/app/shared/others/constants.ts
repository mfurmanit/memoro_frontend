import { MenuElement } from '@models/menu-element';
import { ConfirmationDialogData } from '@models/crud-dialog';
import { CommonAction } from '@models/common-action';
import { ActionType } from '@enums/action-type';
import { SortType } from '@models/sort-type';

export const menuElements: MenuElement[] = [
  {title: 'titles.collections', link: 'collections', icon: 'collections_bookmark'},
  {title: 'titles.learning', link: 'learning', icon: 'school'},
  {title: 'titles.statistics', link: 'statistics', icon: 'insights'},
  {title: 'titles.sharing', link: 'sharing', icon: 'share'}
];

export const defaultConfirmDialogSettings: ConfirmationDialogData = {
  header: 'dialog.confirm',
  content: '',
  okButtonText: 'buttons.confirm',
  declineButtonText: 'buttons.cancel',
  disableClose: false,
  width: undefined
};

export const collectionsSortTypes: SortType[] = [
  SortType.NONE,
  SortType.NAME_ASC,
  SortType.NAME_DESC,
  SortType.CREATED_DATE_ASC,
  SortType.CREATED_DATE_DESC,
];

export const collectionsActions: CommonAction[] = [
  {type: ActionType.EDIT, icon: 'edit'},
  {type: ActionType.DELETE, icon: 'delete'},
  {type: ActionType.LEARN, icon: 'school'},
  {type: ActionType.SHARE, icon: 'share'},
  {type: ActionType.CREATE_CARD, icon: 'sell'}
];

export const cardsSortTypes: SortType[] = [
  SortType.NONE,
  SortType.FRONT_ASC,
  SortType.FRONT_DESC,
  SortType.BACK_ASC,
  SortType.BACK_DESC,
  SortType.CREATED_DATE_ASC,
  SortType.CREATED_DATE_DESC,
];

export const cardsActions: CommonAction[] = [
  {type: ActionType.EDIT, icon: 'edit'},
  {type: ActionType.DELETE, icon: 'delete'},
  {type: ActionType.MARK_AS_FAVORITE, icon: 'favorite'}
];
