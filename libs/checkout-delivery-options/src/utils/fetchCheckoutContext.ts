import {FrontendEndpoint, type Plugin} from '@myparcel-dev/pdk-common';
import {PdkField, PdkUtil, useUtil} from '@myparcel-dev/pdk-checkout-common';

export const fetchCheckoutContext = async (): Promise<Plugin.ModelContextCheckoutContext> => {
  const doRequest = useUtil(PdkUtil.DoRequest);
  const getFieldValue = useUtil(PdkUtil.GetFieldValue);

  const response = await doRequest(FrontendEndpoint.FetchCheckoutContext, {
    shippingMethod: getFieldValue(PdkField.ShippingMethod),
  });

  const context = response?.data?.context?.[0]?.checkout;
  const settings = context?.settings;
  const actions = settings?.actions;
  const methods = settings?.allowedShippingMethods;

  // Reject unusable responses before they replace the settings needed by subsequent requests.
  if (
    !settings ||
    !actions ||
    typeof actions.baseUrl !== 'string' ||
    !actions.endpoints?.[FrontendEndpoint.FetchCheckoutContext] ||
    !methods ||
    typeof methods !== 'object' ||
    !Object.values(methods).every(
      (entries) => Array.isArray(entries) && entries.every((method) => typeof method === 'string'),
    )
  ) {
    throw new Error('Invalid checkout context response');
  }

  return context;
};
