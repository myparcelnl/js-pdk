import {PdkEvent} from '../types';

export const useEvent = <E extends PdkEvent | string>(event: E): E extends PdkEvent ? MyParcelPdkEvents[E] : string => {
  // @ts-expect-error todo
  return window.MyParcelPdk.events[event as keyof typeof window.MyParcelPdk.events];
};
