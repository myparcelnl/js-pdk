import {type CheckoutAppContext} from '../types';
import {ATTRIBUTE_CONTEXT} from '../constants';
import {useConfig} from './useConfig';
import {getElement} from './global';

export const getFrontendContext = (): CheckoutAppContext['checkout'] => {
  const config = useConfig();

  const wrapper = getElement(config.selectors.deliveryOptionsWrapper, false);
  const context = wrapper?.getAttribute(ATTRIBUTE_CONTEXT);

  if (!wrapper || !context) {
    throw new Error('No delivery options wrapper or context found.');
  }

  wrapper.removeAttribute(ATTRIBUTE_CONTEXT);

  const {checkout} = JSON.parse(context) as CheckoutAppContext;

  return checkout;
};
