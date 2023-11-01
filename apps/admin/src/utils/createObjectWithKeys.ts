import {type Keyable} from '@myparcel-pdk/common';
import {type ReadonlyOr} from '@myparcel/ts-utils';

export const createObjectWithKeys = <K extends ReadonlyOr<Keyable[]>, V>(
  keys: K,
  callback: (key: K[number]) => V = (key) => key as V,
): Record<K[number], V> => {
  // @ts-expect-error wonky type inference
  return keys.reduce((acc, key) => ({...acc, [key]: callback(key)}), {}) as Record<K[number], V>;
};
