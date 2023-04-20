import {Keyable} from '@myparcel-pdk/common';

export enum StoreListener {
  Update = 'update',
}

type Store<S extends StoreState = StoreState> = {
  set: (newState: Partial<S>) => void;
  state: S;
  listeners: StoreListenerObject<S>;
  on: <L extends StoreListener>(listener: L, callback: StoreListeners<S>[L]) => void;
};

export type StoreState = Record<string, unknown>;

type StoreListenerObject<S extends StoreState> = {
  [L in StoreListener]?: StoreListeners<S>[L][];
};

export type StoreCallbackUpdate<T extends StoreState = StoreState> = (newState: T, oldState: T) => void | T;

type StoreListeners<T extends StoreState> = {
  [StoreListener.Update]: StoreCallbackUpdate<T>;
};

export type StoreData<S extends StoreState = StoreState, N extends Keyable = Keyable> = Record<N, Store<S>>;

export type InitialStoreData<S extends StoreState = StoreState> = {
  state: S;
  listeners?: StoreListenerObject<S>;
};

export const realCreateStore = <S extends StoreState = StoreState, N extends Keyable = Keyable>(
  name: N,
  initialData: () => InitialStoreData<S>,
): (() => StoreData<S, N>[N]) => {
  const {storedState} = window.MyParcelPdk;

  if (!storedState[name]) {
    const resolvedData: InitialStoreData<S> = initialData();

    storedState[name] = {
      ...resolvedData,

      listeners: (resolvedData.listeners ?? {}) as StoreListenerObject<StoreState>,

      on: (listener, callback) => {
        storedState[name].listeners[listener] ??= [];
        storedState[name].listeners[listener]?.push(callback);
      },

      set: (newState) => {
        const oldState = {...storedState[name].state};
        const state = Object.assign(storedState[name].state, newState);

        // eslint-disable-next-line no-console
        console.log('%cSET', 'color: #0f0', name, {newState, oldState});

        const updateListeners = storedState[name].listeners?.[StoreListener.Update];

        const updates = updateListeners?.map((listener) => {
          return listener({...state}, oldState);
        });

        if (updates?.length) {
          const additionalUpdate = updates.reduce((state, update) => {
            return {...state, ...update};
          }, {});

          Object.assign(storedState[name].state, additionalUpdate);
        }
      },
    };
  }

  return () => {
    return storedState[name] as StoreData<S, N>[N];
  };
};
