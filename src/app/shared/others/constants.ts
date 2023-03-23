import { MenuElement } from '@models/menu-element';
import { ConfirmationDialogData } from '@models/crud-dialog';

export const menuElements: MenuElement[] = [
  {title: 'titles.homePage', link: 'home-page', icon: 'home'},
  {title: 'titles.collections', link: 'collections', icon: 'collections_bookmark'},
  {title: 'titles.learning', link: 'learning', icon: 'school'},
  {title: 'titles.sharing', link: 'sharing', icon: 'share'},
  {title: 'titles.favorite', link: 'favorite', icon: 'hotel_class'},
  {title: 'titles.reports', link: 'reports', icon: 'insights'}
];

export const defaultConfirmDialogSettings: ConfirmationDialogData = {
  header: 'dialog.confirm',
  content: '',
  okButtonText: 'buttons.confirm',
  declineButtonText: 'buttons.cancel',
  disableClose: false,
  width: undefined
};
