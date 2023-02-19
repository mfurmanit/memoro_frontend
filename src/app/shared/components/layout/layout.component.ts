import { Component } from '@angular/core';
import { AuthenticationService } from '@services/authentication.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {

  constructor(private authenticationService: AuthenticationService) {
  }

  logout(): void {
    this.authenticationService.logout();
  }
}
