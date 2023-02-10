import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ACKNOWLEDGED_BROADCAST_CHANNEL, EndpointId, getWindow, MessageType } from '@mpblog/shared';
import { take } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'tabcomm-project-selector',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<tabcomm-project-selector-ui (changePid)="onChangePid($event)"></tabcomm-project-selector-ui>`,
})
export class ProjectSelectorContainerComponent {
  readonly window = getWindow();
  readonly channel =  inject(ACKNOWLEDGED_BROADCAST_CHANNEL);
  readonly messageType = MessageType.USER_SELECTED_PROJECT_ID;

  onChangePid(pid: string): void {
    const endpointId: EndpointId = 'Project-Selector';
    const newTabEndpointId: EndpointId = uuidv4();
    const payload = {
        pid,
    };

    this.channel.onAcknowledge(this.messageType, newTabEndpointId).pipe(
        take(1),    // we unsubscribe right away
    ).subscribe(() => {
        this.channel.broadcast(this.messageType, endpointId, payload);
    });

    this.window.open(`tabcomm/project?eid=${newTabEndpointId}`);
  }
}
