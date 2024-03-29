import {type MyParcelPdk} from '../types';
import {type PdkEvent} from '../data';

export const useEvent = <E extends PdkEvent | string>(
  event: E,
): E extends PdkEvent ? MyParcelPdk['events'][E] : string => {
  // @ts-expect-error todo
  return window.MyParcelPdk.events[event as keyof typeof window.MyParcelPdk.events];
};
