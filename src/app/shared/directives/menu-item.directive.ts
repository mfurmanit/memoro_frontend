import { Directive, HostListener } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Directive({
  selector: '[appMenuItem]'
})
export class MenuItemDirective {
  constructor(private drawer: MatSidenav) {
  }

  @HostListener('click') click() {
    this.drawer.mode === 'over' && this.drawer.close();
  }
}
