import {Util, useUtil} from '../useUtil';
import {FrontendAppContext} from '../../types';
import {useConfig} from '../../config';

const ATTRIBUTE_CONTEXT = 'data-context';

export const getFrontendContext = (): FrontendAppContext['checkout'] => {
  const getElement = useUtil(Util.GetElement);

  const config = useConfig();

  const wrapper = getElement(config.selectors.deliveryOptionsWrapper);
  const context = wrapper?.getAttribute(ATTRIBUTE_CONTEXT);

  if (!wrapper || !context) {
    throw new Error('No delivery options wrapper or context found.');
  }

  const {checkout} = JSON.parse(context) as FrontendAppContext;

  return checkout;
};
