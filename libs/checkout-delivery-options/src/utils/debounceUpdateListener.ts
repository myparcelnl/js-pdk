import {type StoreCallbackUpdate, type StoreState} from '@myparcel-dev/pdk-checkout-common';

/**
 * Wait until a store has not changed for `delay` milliseconds, then call the update listener once.
 *
 * A store calls its update listeners with the new state and the state before that one change. When
 * the store changes several times within the delay, `debounce` passes on only the arguments of the
 * last change. The old state of that change already holds the earlier changes, so a listener that
 * compares the two states cannot see them. For example: the cart weight changes, then the selected
 * delivery option changes. The listener compares two states with the same weight, and does not send
 * the new weight to the delivery options.
 *
 * This function gives the listener the state from before the first of those changes, so it compares
 * the state before all the changes with the state after all the changes.
 */
export const debounceUpdateListener = <S extends StoreState>(
  listener: StoreCallbackUpdate<S>,
  delay = 100,
): StoreCallbackUpdate<S> => {
  let timer: ReturnType<typeof setTimeout> | undefined;
  let stateBeforeFirstChange: S | undefined;

  return (newState, oldState) => {
    // No timer runs, so this is the first change since the listener was last called.
    if (timer === undefined) {
      stateBeforeFirstChange = oldState;
    }

    clearTimeout(timer);
    timer = setTimeout(() => {
      const previousState = stateBeforeFirstChange;

      timer = undefined;
      stateBeforeFirstChange = undefined;
      void listener(newState, previousState);
    }, delay);
  };
};
