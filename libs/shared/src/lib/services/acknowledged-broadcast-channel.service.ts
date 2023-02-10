import { InjectionToken, NgZone, inject } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JSONValue } from '../model/json.model';
import { runInZone } from '../model/operator.model';

export const ACKNOWLEDGED_BROADCAST_CHANNEL = new InjectionToken('', {
    providedIn: 'root',
    factory() {
        const zone = inject(NgZone);
        const service = new AcknowledgedBroadcastChannelService('mpblog-acknowledged-broadcast-channel', zone);
        return service;
    },
});

export enum MessageType {
    USER_SELECTED_PROJECT_ID = 'user-selected-project-pid',
}

export type EndpointId = string;

export type Message = {
    type: MessageType,
    endpointId: EndpointId,
    payload: JSONValue | null,
}

export type Acknowledgements = Record<MessageType, EndpointId[]> | Record<string, never>;

export class AcknowledgedBroadcastChannelService {
    readonly ackMessagePayload = 'ACK';

    private zone: NgZone;
    private broadcastChannel: BroadcastChannel;
    private broadcastChannel$: Subject<Message> = new Subject<Message>();
    private acknowledgements$: BehaviorSubject<Acknowledgements> = new BehaviorSubject<Acknowledgements>({});

    constructor(name: string, zone: NgZone) {
        this.zone = zone;
        this.broadcastChannel = new BroadcastChannel(name);
        this.broadcastChannel.onmessage = (({ data }: { data: Message }) => {
            if (data.payload === this.ackMessagePayload) {
                const acknowledgements = this.addAcknowledgement(this.acknowledgements$.getValue() , data.type, data.endpointId);
                this.acknowledgements$.next(acknowledgements);
            } else {
                this.broadcastChannel$.next(data);
            }
        });
    }

    public acknowledge(type: MessageType, endpointId: EndpointId): void {
        const ackMessage: Message = {
            type,
            endpointId,
            payload: this.ackMessagePayload,
        };
        this.broadcastChannel.postMessage(ackMessage);
    }

    public broadcast(type: MessageType, endpointId: EndpointId, payload: JSONValue): void {
        const message: Message = {
            type,
            endpointId,
            payload,
        };
        this.broadcastChannel.postMessage(message);
    }

    public onAcknowledge(type: MessageType, endpointId: EndpointId): Observable<boolean> {
        return this.acknowledgements$.asObservable().pipe(
            filter((acknowledgements: Acknowledgements) => {
                return acknowledgements[type] && acknowledgements[type].some((ceid: EndpointId) => ceid === endpointId);
            }),
            map(() => true),
        );
    }

    public onBroadcast(type: MessageType): Observable<Message> {
        return this.broadcastChannel$.asObservable().pipe(
            runInZone(this.zone),
            filter((message: Message) => message.type === type),
        );
    }

    public close(): void {
        this.broadcastChannel.close();
        this.broadcastChannel$.complete();
    }

    private addAcknowledgement(acknowledgements: Acknowledgements, type: MessageType, endpointId: EndpointId): Acknowledgements {
        if (!this.isEndpointAcknowledgedForType(acknowledgements, type, endpointId)) {
            acknowledgements[type] = [
                ...(acknowledgements[type] ? acknowledgements[type] : []),
                endpointId,
            ];
        } else {
            acknowledgements[type] = [endpointId];
        }
        return acknowledgements;
    }

    private isEndpointAcknowledgedForType(acknowledgements: Acknowledgements, type: MessageType, endpointId: EndpointId): boolean {
        return acknowledgements[type] &&
            acknowledgements[type].some((existing: EndpointId) => existing === endpointId);
    }
}
