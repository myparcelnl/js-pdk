import {PdkDeliveryOptionsEvent} from './types';
import {createDeliveryOptionsStore} from './store';

declare global {
  interface MyParcelPdkEvents {
    [PdkDeliveryOptionsEvent.DeliveryOptionsUpdated]: string;
  }

  interface MyParcelPdkStores {
    deliveryOptions: ReturnType<typeof createDeliveryOptionsStore>;
  }
}
