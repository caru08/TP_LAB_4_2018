import { trigger, animate, style, transition } from '@angular/animations';

export function FadeTransition(time: number = .5) {
  return trigger('FadeTransition', [
    transition('void => *', [
      style({ opacity: 0}),
      animate(time + 's ease-in',
        style({ opacity: 1}),
      )
    ]),
    transition('* => void', [
      style({ opacity: 1}),
      animate(time + 's ease-in',
        style({ opacity: 0}),
      )
    ])
  ]);

}
