import {type Plugin} from '@myparcel-pdk/common';
import {ATTRIBUTE_CONTEXT} from '../constants';
import {useConfig} from './useConfig';
import {getElement} from './global/getElement';

export const getFrontendContext = (): Plugin.ModelContextCheckoutContext => {
  const config = useConfig();

  const wrapper = getElement(config.selectors.deliveryOptionsWrapper, false);
  const context = wrapper?.getAttribute(ATTRIBUTE_CONTEXT);

  if (!wrapper || !context) {
    throw new Error('No delivery options wrapper or context found.');
  }

  wrapper.removeAttribute(ATTRIBUTE_CONTEXT);

  const {checkout} = JSON.parse(context) as Plugin.ModelContextContextBag;

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return checkout!;
};
