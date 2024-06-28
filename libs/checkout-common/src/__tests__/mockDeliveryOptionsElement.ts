import {type CheckoutAppContext} from '../types';
import {ATTRIBUTE_CONTEXT} from '../constants';
import {getMockCheckoutContext} from './getMockCheckoutContext';

export const mockDeliveryOptionsElement = (): void => {
  const form = document.createElement('form');

  const wrapper = document.createElement('div');
  const element = document.createElement('div');

  form.id = 'test-wrapper';
  wrapper.id = 'delivery-options-wrapper';
  element.id = 'delivery-options';

  wrapper.setAttribute(
    ATTRIBUTE_CONTEXT,
    JSON.stringify({checkout: getMockCheckoutContext()} satisfies CheckoutAppContext),
  );

  wrapper.appendChild(element);
  form.appendChild(wrapper);

  document.body.appendChild(form);
};
