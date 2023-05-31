import { Component } from '@angular/core';
import { MenuElement } from '@models/menu-element';
import { menuElements } from '@others/constants';
import { AuthenticationService } from '@services/authentication.service';
import { BaseComponent } from '@components/base/base.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent extends BaseComponent {

  readonly menuElements: MenuElement[] = menuElements;

  constructor(private authenticationService: AuthenticationService) {
    super();
    this.authenticationService.loadUserContext();
  }
}
