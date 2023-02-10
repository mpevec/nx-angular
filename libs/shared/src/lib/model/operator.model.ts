import { NgZone } from "@angular/core";
import { Observable, OperatorFunction } from "rxjs";

// Run all lifecycle hooks of an Observable inside of the NgZone as RxJS operator
export const runInZone = (zone: NgZone): OperatorFunction<any, any> => {
  return (source) => {
      return new Observable(observer => {
          const onNext = (value: any) => zone.run(() => observer.next(value));
          const onError = (e: any) => zone.run(() => observer.error(e));
          const onComplete = () => zone.run(() => observer.complete());
          return source.subscribe({ next: onNext, error: onError, complete: onComplete });
      });
  };
};

