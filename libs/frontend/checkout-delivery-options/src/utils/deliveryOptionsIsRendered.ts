import {Util, useConfig, useUtil} from '@myparcel-pdk/frontend-checkout-core/src';

export const deliveryOptionsIsRendered = (): boolean => {
  const config = useConfig();
  const getElement = useUtil(Util.GetElement);

  return !getElement(config.selectors.deliveryOptions, false);
};
