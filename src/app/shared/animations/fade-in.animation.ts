import { animate, style, transition, trigger } from '@angular/animations';

export const fadeInAnimation = trigger('fadeIn', [
  transition(':enter', [
    style({opacity: 0}),
    animate('200ms ease-out', style({opacity: 1})),
  ])
]);
