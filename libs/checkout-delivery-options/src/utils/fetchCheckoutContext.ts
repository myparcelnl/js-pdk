import {FrontendEndpoint, type Plugin} from '@myparcel-dev/pdk-common';
import {PdkField, PdkUtil, useUtil} from '@myparcel-dev/pdk-checkout-common';

/**
 * Check that a checkout context holds the settings that the next requests read.
 *
 * `updateContext` stores the context, and every request after that reads its settings:
 * - `doRequest` takes the base URL and the endpoint of the next request from `settings.actions`.
 * - The shipping method checks look up the shipping method in `settings.allowedShippingMethods`,
 *   which holds a list of shipping methods per package type.
 *
 * A context without these settings would break every later request, and the checkout could not
 * recover from it. So it must not replace the context that the checkout already has.
 */
const hasUsableSettings = (
  context: Plugin.ModelContextCheckoutContext | undefined,
): context is Plugin.ModelContextCheckoutContext => {
  const actions = context?.settings?.actions;
  const shippingMethods = context?.settings?.allowedShippingMethods;

  if (typeof actions?.baseUrl !== 'string' || !actions.endpoints?.[FrontendEndpoint.FetchCheckoutContext]) {
    return false;
  }

  return (
    typeof shippingMethods === 'object' &&
    shippingMethods !== null &&
    Object.values(shippingMethods).every(Array.isArray)
  );
};

/**
 * Fetch the checkout context for the selected shipping method.
 *
 * @throws {Error} When the response has no context with usable settings. The caller keeps its current context.
 */
export const fetchCheckoutContext = async (): Promise<Plugin.ModelContextCheckoutContext> => {
  const doRequest = useUtil(PdkUtil.DoRequest);
  const getFieldValue = useUtil(PdkUtil.GetFieldValue);

  const response = await doRequest(FrontendEndpoint.FetchCheckoutContext, {
    shippingMethod: getFieldValue(PdkField.ShippingMethod),
  });

  const context = response?.data?.context?.[0]?.checkout;

  if (!hasUsableSettings(context)) {
    throw new Error('Invalid checkout context response');
  }

  return context;
};
