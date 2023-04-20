import {Util, useSettingsStore, useUtil} from '@myparcel-pdk/frontend-checkout-core/src';

export const hasTaxFields = (): boolean => {
  const settings = useSettingsStore();

  let hasTaxFields = true;

  if (settings.state.hasDeliveryOptions) {
    const getFieldValue = useUtil(Util.GetFieldValue);

    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    const {carrier} = JSON.parse(getFieldValue(settings.state.hiddenInputName) || '{}');

    hasTaxFields = settings.state.carriersWithTaxFields.includes(carrier);
  }

  return hasTaxFields;
};
