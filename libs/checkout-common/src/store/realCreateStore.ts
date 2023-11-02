import {type Keyable} from '@myparcel-pdk/common';
import {objectIsEqual} from '@myparcel/ts-utils';
import {type InitialStoreData, type StoreData, type StoreListenerObject, type StoreState} from '../types';
import {StoreListener} from '../data'; // eslint-disable-next-line max-lines-per-function
import {logStoreDebugInfo} from './logStoreDebugInfo';

// eslint-disable-next-line max-lines-per-function
export const realCreateStore = <S extends StoreState = StoreState, N extends Keyable = Keyable>(
  name: N,
  initialData: () => InitialStoreData<S>,
): (() => StoreData<S, N>[N]) => {
  const {storedState} = window.MyParcelPdk;

  if (!storedState[name]) {
    const {state, ...rest}: InitialStoreData<S> = initialData();

    storedState[name] = {
      state: {},

      listeners: (rest.listeners ?? {}) as StoreListenerObject<StoreState>,

      on(listener, callback) {
        storedState[name].listeners[listener] ??= [];
        storedState[name].listeners[listener]?.push(callback);
      },

      async set(newState) {
        const oldState = {...storedState[name].state};
        const state = {...oldState, ...newState};

        if (objectIsEqual(state, oldState)) {
          return;
        }

        logStoreDebugInfo(name, state, oldState);

        Object.assign(storedState[name].state, newState);

        const updateListeners = storedState[name].listeners?.[StoreListener.Update];

        const updates = await Promise.all(
          updateListeners?.map(async (listener) => {
            return listener({...state}, oldState);
          }) ?? [],
        );

        if (updates.length) {
          const additionalUpdate = updates.reduce((state, update) => {
            return {...state, ...update};
          }, {});

          Object.assign(storedState[name].state, additionalUpdate);
        }
      },
    };

    // Trigger the update listeners on initialisation.
    void storedState[name].set(state);
  }

  return () => {
    return storedState[name] as StoreData<S, N>[N];
  };
};
