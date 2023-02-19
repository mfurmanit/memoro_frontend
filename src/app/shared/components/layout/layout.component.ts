import { Component } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MenuElement } from '@models/menu-element';
import { menuElements } from '@others/constants';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  isHandset$: Observable<boolean> = this.watchForBreakpoints([Breakpoints.Handset]);
  readonly menuElements: MenuElement[] = menuElements;

  constructor(private breakpointObserver: BreakpointObserver) {
  }

  private watchForBreakpoints(breakPoints: string[]): Observable<boolean> {
    return this.breakpointObserver.observe(breakPoints)
      .pipe(
        map(result => result.matches),
        shareReplay()
      );
  }
}
