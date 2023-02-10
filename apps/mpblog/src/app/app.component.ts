import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'mpblog-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent { }
