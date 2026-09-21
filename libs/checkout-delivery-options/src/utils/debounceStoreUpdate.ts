import {type StoreCallbackUpdate, type StoreState} from '@myparcel-dev/pdk-checkout-common';

/** Compare the final state with the state before the first update in a burst. */
export const debounceStoreUpdate = <S extends StoreState>(
  callback: StoreCallbackUpdate<S>,
  delay = 100,
): StoreCallbackUpdate<S> => {
  let timer: ReturnType<typeof setTimeout> | undefined;
  let initialState: S | undefined;

  return (newState, oldState) => {
    if (timer === undefined) {
      initialState = oldState;
    }

    clearTimeout(timer);
    timer = setTimeout(() => {
      const previousState = initialState;
      timer = undefined;
      initialState = undefined;
      void callback(newState, previousState);
    }, delay);
  };
};
