import {useConfig, useUtil, Util} from '@myparcel-pdk/checkout-core';

export const triggerFormChange = (): void => {
  const triggerEvent = useUtil(Util.TriggerEvent);
  const config = useConfig();

  triggerEvent('change', undefined, config.getForm());
};
