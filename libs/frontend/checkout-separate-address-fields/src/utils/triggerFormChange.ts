import {useUtil, Util, useConfig} from '@myparcel-pdk/frontend-checkout-core/src';

export const triggerFormChange = (): void => {
  const triggerEvent = useUtil(Util.TriggerEvent);
  const config = useConfig();

  triggerEvent('change', undefined, config.getForm());
};
