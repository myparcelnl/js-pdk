import {useConfig, useUtil, Util} from '@myparcel-pdk/checkout-core';

export const deliveryOptionsIsRendered = (): boolean => {
  const config = useConfig();
  const getElement = useUtil(Util.GetElement);

  return !getElement(config.selectors.deliveryOptions, false);
};
