import {PdkUtil, useConfig, useUtil} from '@myparcel-dev/pdk-checkout-common';

/**
 * In delivery options 5.x, checking if the element exists is enough. In 6.x, the element is always present, so we need
 * to check if it has content.
 */
export const deliveryOptionsIsRendered = (): boolean => {
  const config = useConfig();
  const getElement = useUtil(PdkUtil.GetElement);

  const element = getElement(config.selectors.deliveryOptions, false);

  return !element || element.innerHTML !== '';
};
