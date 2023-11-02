import {type DeliveryOptionsStore} from './types/store.types';
import {type PdkDeliveryOptionsEvent} from './types';

declare global {
  interface AdditionalEvents {
    [PdkDeliveryOptionsEvent.DeliveryOptionsUpdated]: string;
  }

  interface AdditionalStores {
    deliveryOptions: DeliveryOptionsStore;
  }
}
