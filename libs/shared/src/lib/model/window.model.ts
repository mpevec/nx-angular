import { inject, InjectionToken } from '@angular/core';

export const WINDOW: InjectionToken<Window> = new InjectionToken<Window>("", {
  providedIn: 'root',
  factory() {
    return window;
  }
});

export const getWindow = (): Window => {
  return inject(WINDOW)
};
