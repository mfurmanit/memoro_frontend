import { Component, EventEmitter, Output } from '@angular/core';
import { AuthenticationService } from '@services/authentication.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  @Output() readonly toggleSidenav = new EventEmitter<void>();

  constructor(private authenticationService: AuthenticationService) {
  }

  logout(): void {
    this.authenticationService.logout();
  }
}
