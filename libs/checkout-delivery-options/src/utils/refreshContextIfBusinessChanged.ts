import {PdkField, useCheckoutStore, useConfig} from '@myparcel-dev/pdk-checkout-common';
import {updateContext} from './updateContext';

/**
 * Fetch a new checkout context when the recipient's business flag differs from the flag the
 * current context was built with.
 *
 * The context is built server-side and holds the carriers the recipient can use. A business
 * recipient gets a different set, so the context goes stale when the flag changes. The comparison
 * is against the flag the server sent back, not against the previous form value: a context that
 * comes back with the old flag leaves the two different, so the next call asks again. That is what
 * makes a save the platform reported too early correct itself.
 *
 * The platform decides when to call this. It is the only side that knows when its own address save
 * reached the server. A platform that does not report the flag is left alone.
 */
export const refreshContextIfBusinessChanged = async (): Promise<void> => {
  const config = useConfig();

  if (!config.formData[PdkField.IsBusiness]) {
    return;
  }

  const checkout = useCheckoutStore();
  const reported = Boolean(checkout.state.form[PdkField.IsBusiness]);
  const inContext = Boolean(checkout.state.context.config?.isBusiness);

  if (reported === inContext) {
    return;
  }

  await updateContext();
};
