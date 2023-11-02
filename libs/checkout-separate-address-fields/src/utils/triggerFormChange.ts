import {PdkUtil, useConfig, useUtil} from '@myparcel-pdk/checkout-common';

export const triggerFormChange = (): void => {
  const triggerEvent = useUtil(PdkUtil.TriggerEvent);
  const config = useConfig();

  triggerEvent('change', undefined, config.getForm());
};
