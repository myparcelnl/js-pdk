import {type Plugin} from '@myparcel-pdk/common';

export const useSettings = (): Plugin.ModelContextCheckoutContext['settings'] => {
  return window.MyParcelPdk.stores.checkout.state.context.settings;
};
