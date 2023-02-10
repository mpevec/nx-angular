import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ACKNOWLEDGED_BROADCAST_CHANNEL, EndpointId, getRouteQueryParam, JSONObject, Message, MessageType } from '@mpblog/shared';
import { Observable, of } from 'rxjs';
import { catchError, map, take, timeout } from 'rxjs/operators';

@Component({
  selector: 'tabcomm-project',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<tabcomm-project-ui *ngIf="(pid$ | async) as pid"
                              [pid]="pid"></tabcomm-project-ui>`,
})
export class ProjectContainerComponent {
  pid$: Observable<string | null>;

  readonly channel =  inject(ACKNOWLEDGED_BROADCAST_CHANNEL);
  readonly messageType = MessageType.USER_SELECTED_PROJECT_ID;
  readonly endpointIdToBeAck: EndpointId = getRouteQueryParam('eid');

  constructor() {
    this.pid$ = this.channel.onBroadcast(this.messageType).pipe(
      timeout(3500),
      catchError(() => {
        return of(null);
      }),
      map((message: Message | null) => message ? (message.payload as JSONObject)['pid'] as string : null),
      take(1),
    );

    this.channel.acknowledge(this.messageType, this.endpointIdToBeAck);
  }
}
