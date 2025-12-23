import {type Plugin} from '@myparcel-dev/pdk-common';

export const useSettings = (): Plugin.ModelContextCheckoutContext['settings'] => {
  return window.MyParcelPdk.stores.checkout.state.context.settings;
};
