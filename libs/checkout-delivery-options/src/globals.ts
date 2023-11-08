import {type DeliveryOptionsStore, type PdkDeliveryOptionsEvent} from './types';

declare global {
  interface AdditionalEvents {
    [PdkDeliveryOptionsEvent.DeliveryOptionsUpdated]: string;
  }

  interface AdditionalStores {
    deliveryOptions: DeliveryOptionsStore;
  }
}
