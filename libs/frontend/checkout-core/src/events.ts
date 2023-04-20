// noinspection JSUnusedGlobalSymbols

import {
  EVENT_CHECKOUT,
  EVENT_STORE,
  EVENT_TYPE_INITIALIZED,
  EVENT_TYPE_UPDATE,
  EVENT_TYPE_UPDATED,
  createEventName,
} from './data';

export const eventCheckoutUpdate = createEventName(EVENT_CHECKOUT, EVENT_TYPE_UPDATE);

export const eventCheckoutUpdated = createEventName(EVENT_CHECKOUT, EVENT_TYPE_UPDATED);

export const eventStoreInitialize = createEventName(EVENT_STORE, EVENT_TYPE_INITIALIZED);
