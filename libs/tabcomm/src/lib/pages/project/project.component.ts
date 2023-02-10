import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'tabcomm-project-ui',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="container">
                 I've recieved project id: {{ pid | json  }}
             </div>`
})
export class ProjectComponent {
  @Input() pid: string;
}
