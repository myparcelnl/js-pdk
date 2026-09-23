import {ADDRESS_FIELD_IS_BUSINESS, useCheckoutStore, useConfig} from '@myparcel-dev/pdk-checkout-common';
import {updateContext} from './updateContext';

/**
 * Fetch a new checkout context when the recipient's business flag differs from the flag the
 * current context was built with.
 *
 * The context is built server-side and holds the carriers the recipient can use. A business
 * recipient gets a different set, so the context goes stale when the flag changes.
 *
 * The flag is read from the address the order is delivered to, the one the checkout store resolves,
 * so a checkout where the billing address doubles as the delivery address needs no rule of its own.
 * The server resolves the same way when it builds the context.
 *
 * The comparison is against the flag the server sent back, not against the previous form value. A
 * context that comes back with the old flag leaves the two different, so the next call asks again.
 * That is what makes a platform that reported a moment too early correct itself.
 *
 * The platform decides when to call this. It is the only side that knows when its own address
 * reached the server. A platform that does not report the flag is left alone.
 */
export const refreshContextIfBusinessChanged = async (): Promise<void> => {
  const checkout = useCheckoutStore();
  const {addressType} = checkout.state;

  if (!useConfig().formData[addressType]?.[ADDRESS_FIELD_IS_BUSINESS]) {
    return;
  }

  const reported = Boolean(checkout.state.form[addressType]?.[ADDRESS_FIELD_IS_BUSINESS]);
  const inContext = Boolean(checkout.state.context.config?.isBusiness);

  if (reported === inContext) {
    return;
  }

  await updateContext();
};
