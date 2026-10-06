import {FrontendEndpoint, type Plugin} from '@myparcel-dev/pdk-common';
import {PdkField, PdkUtil, useUtil} from '@myparcel-dev/pdk-checkout-common';

export const fetchCheckoutContext = async (): Promise<Plugin.ModelContextCheckoutContext> => {
  const doRequest = useUtil(PdkUtil.DoRequest);
  const getFieldValue = useUtil(PdkUtil.GetFieldValue);

  const response = await doRequest(FrontendEndpoint.FetchCheckoutContext, {
    shippingMethod: getFieldValue(PdkField.ShippingMethod),
  });

  return response.data?.context?.[0]?.checkout ?? ({} as Plugin.ModelContextCheckoutContext);
};
