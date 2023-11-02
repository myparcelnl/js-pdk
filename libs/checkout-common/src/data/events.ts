export enum PdkEvent {
  CheckoutUpdate = 'checkoutUpdate',
  CheckoutUpdated = 'checkoutUpdated',
  StoreInitialize = 'storeInitialize',
  StoreInitialized = 'storeInitialized',
}

const EVENT_PREFIX = 'myparcelnl';
const EVENT_SEPARATOR = ':';
export const EVENT_STORE = 'store';

export const EVENT_DELIVERY_OPTIONS = 'deliveryOptions';

export const EVENT_CHECKOUT = 'checkout';

export const EVENT_PDK = 'pdk';

export const EVENT_TYPE_INITIALIZE = 'initialize';

export const EVENT_TYPE_INITIALIZED = `${EVENT_TYPE_INITIALIZE}d`;

export const EVENT_TYPE_SYNCHRONIZE = 'synchronize';

export const EVENT_TYPE_SYNCHRONIZED = `${EVENT_TYPE_SYNCHRONIZE}d`;

export const EVENT_TYPE_UPDATE = 'update';

export const EVENT_TYPE_UPDATED = `${EVENT_TYPE_UPDATE}d`;

export const createEventName = (...names: string[]): string => {
  return [EVENT_PREFIX, ...names].join(EVENT_SEPARATOR);
};

export const eventCheckoutUpdate = createEventName(EVENT_CHECKOUT, EVENT_TYPE_UPDATE);

export const eventCheckoutUpdated = createEventName(EVENT_CHECKOUT, EVENT_TYPE_UPDATED);

export const eventStoreInitialize = createEventName(EVENT_STORE, EVENT_TYPE_INITIALIZED);
