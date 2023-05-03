/* eslint-disable no-console */
import {Keyable} from '@myparcel-pdk/common/src';
import {StoreState} from '@myparcel-pdk/frontend-checkout-core/src';

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
