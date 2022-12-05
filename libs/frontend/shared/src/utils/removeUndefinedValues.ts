/* eslint-disable @typescript-eslint/no-unused-vars */

type PlainObject<V = unknown> = Record<string, V>;

type OmitUndefined<T> = Omit<T, {[K in keyof T]: T[K] extends undefined ? K : never}[keyof T]>;

export const removeUndefinedValues = <O extends PlainObject>(object: O): OmitUndefined<O> => {
  return Object.fromEntries(Object.entries(object).filter(([_, value]) => value !== undefined)) as OmitUndefined<O>;
};
