import {type Keyable} from '@myparcel-pdk/common';
import {type StoreState} from '../types/store.types';

export const logStoreDebugInfo = (
  name: Keyable,
  newState: Partial<StoreState>,
  oldState: Record<string, unknown>,
): void => {
  if (import.meta.env.MODE !== 'development') {
    return;
  }

  const storeName = name.toString();

  const color = storeName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 360;

  console.log(`%c[UPDATE] ${storeName}`, `color: hsl(${color}, 100%, 60%)`, {newState, oldState});
};
