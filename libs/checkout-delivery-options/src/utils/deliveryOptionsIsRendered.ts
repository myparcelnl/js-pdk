import {PdkUtil, useConfig, useUtil} from '@myparcel-pdk/checkout-common';

export const deliveryOptionsIsRendered = (): boolean => {
  const config = useConfig();
  const getElement = useUtil(PdkUtil.GetElement);

  return !getElement(config.selectors.deliveryOptions, false);
};
