import { useLayoutEffect, useRef, useState } from 'react';
import { debounceTime, fromEvent, map, Subscription } from 'rxjs';
import { Option } from '@/types';
import * as R from 'ramda';

let id = 0;
let listeners: Record<string, () => void> = {};
let subscription: Option<Subscription> = null;

function initResizeSubscription(): void {
  if (!subscription) {
    subscription = fromEvent(window, 'resize')
      .pipe(
        debounceTime(300),
        map(() => {
          console.log('debounce');
          for (const key of Object.keys(listeners)) {
            listeners[key]();
          }
        }),
      )
      .subscribe();
  }
}

function destroyResizeSubscription(currentId: string): void {
  listeners = R.dissoc(currentId, listeners);
  if (Object.keys(listeners).length === 0) {
    subscription?.unsubscribe();
    subscription = null;
  }
}

export function useIsMobile(): boolean {
  const currentId = useRef(id.toString());
  const [width, setWidth] = useState(window.innerWidth);
  useLayoutEffect(() => {
    listeners[currentId.current] = () => setWidth(window.innerWidth);
    initResizeSubscription();
    ++id;
    return () => destroyResizeSubscription(currentId.current);
  }, []);
  return width <= 768;
}
