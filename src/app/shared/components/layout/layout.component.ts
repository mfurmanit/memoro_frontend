import { Component } from '@angular/core';
import { MenuElement } from '@models/menu-element';
import { menuElements } from '@others/constants';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  readonly menuElements: MenuElement[] = menuElements;
}
