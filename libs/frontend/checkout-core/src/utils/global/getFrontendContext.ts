import {CheckoutAppContext} from '../../types';
import {getElement} from './getElement';
import {useConfig} from '../../config';

const ATTRIBUTE_CONTEXT = 'data-context';

export const getFrontendContext = (): CheckoutAppContext['checkout'] => {
  const config = useConfig();

  const wrapper = getElement(config.selectors.deliveryOptionsWrapper);
  const context = wrapper?.getAttribute(ATTRIBUTE_CONTEXT);

  if (!wrapper || !context) {
    throw new Error('No delivery options wrapper or context found.');
  }

  const {checkout} = JSON.parse(context) as CheckoutAppContext;

  return checkout;
};