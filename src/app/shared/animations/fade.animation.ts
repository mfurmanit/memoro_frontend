import { animate, group, query, style, transition, trigger } from '@angular/animations';

export const fadeAnimation =
  trigger('fadeAnimation', [
    transition('* => *', [
      query(':enter, :leave', [
        style({ position: 'absolute', width: '100%', height: '100%' })
      ], { optional: true }),
      query(':enter',
        [
          style({opacity: 0})
        ],
        {optional: true}
      ),
      query(':leave',
        [
          style({opacity: 1})
        ],
        {optional: true}
      ),
      group([
        query(':leave', [
          animate('0.2s', style({opacity: 0}))
        ], {optional: true}),
        query(':enter', [
          animate('0.2s', style({opacity: 1}))
        ], {optional: true})
      ])
    ])
  ]);

