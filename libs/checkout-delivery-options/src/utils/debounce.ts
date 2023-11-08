/* eslint-disable @typescript-eslint/no-explicit-any */
import {type PromiseOr} from '@myparcel/ts-utils';

export function debounce<Cb extends (...args: any[]) => PromiseOr<any>>(fn: Cb, delay = 100): Cb {
  let timer: NodeJS.Timeout;

  return ((...args: any[]) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  }) as Cb;
}
