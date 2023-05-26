import {type PdkDeliveryOptionsEvent} from './types';
import {type createDeliveryOptionsStore} from './store';

declare global {
  interface MyParcelPdkEvents {
    [PdkDeliveryOptionsEvent.DeliveryOptionsUpdated]: string;
  }

  interface MyParcelPdkStores {
    deliveryOptions: ReturnType<typeof createDeliveryOptionsStore>;
  }
}
