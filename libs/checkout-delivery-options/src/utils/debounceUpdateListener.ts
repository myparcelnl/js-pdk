import {type StoreCallbackUpdate, type StoreState} from '@myparcel-dev/pdk-checkout-common';

/**
 * Call a store update listener once after the store has not changed for `delay` milliseconds.
 */
export const debounceUpdateListener = <S extends StoreState>(
  listener: StoreCallbackUpdate<S>,
  delay = 100,
): StoreCallbackUpdate<S> => {
  let timer: ReturnType<typeof setTimeout> | undefined;
  let stateBeforeFirstChange: S | undefined;

  return (newState, oldState) => {
    // Keep the old state of the first change. `debounce` passes only the arguments of the last change, so a
    // listener that compares the two states would miss an earlier change, such as a new cart weight.
    if (timer === undefined) {
      stateBeforeFirstChange = oldState;
    }

    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = undefined;
      void listener(newState, stateBeforeFirstChange);
    }, delay);
  };
};
