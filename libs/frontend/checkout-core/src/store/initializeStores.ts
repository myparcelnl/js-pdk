import {Util, getAddressType, useCheckoutStore, useSettingsStore, useUtil} from '../utils';
import {createCheckoutStore} from './createCheckoutStore';
import {createSettingsStore} from './createSettingsStore';

export const initializeStores = (): void => {
  window.MyParcelPdk.stores.settings = createSettingsStore();
  window.MyParcelPdk.stores.checkout = createCheckoutStore();

  const getFrontendContext = useUtil(Util.GetFrontendContext);

  const context = getFrontendContext();

  const settings = useSettingsStore();
  settings.set(context.settings);

  const checkout = useCheckoutStore();
  checkout.set({
    addressType: getAddressType(),
    // shippingMethod: getSelectedShippingMethod(),
  });
};
