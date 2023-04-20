import {ADDRESS_TYPES, AddressField, Util, useUtil} from '@myparcel-pdk/frontend-checkout-core/src';
import {fillAddressFields} from './fillAddressFields';
import {getAddressParts} from './getAddressParts';
import {hasSeparateAddressFields} from './hasSeparateAddressFields';
import {isOfType} from '@myparcel/ts-utils';

/**
 * Sync addresses between split and non-split address fields.
 */
export const synchronizeAddress = (event: Event | (CustomEvent & {detail: string})): void => {
  if (!isOfType<CustomEvent>(event, 'detail')) {
    return;
  }

  if (!hasSeparateAddressFields()) {
    return;
  }

  const getFieldValue = useUtil(Util.GetFieldValue);
  const hasAddressType = useUtil(Util.HasAddressType);
  const setFieldValue = useUtil(Util.SetFieldValue);

  ADDRESS_TYPES.forEach((addressType) => {
    if (!hasAddressType(addressType)) {
      return;
    }

    if (hasSeparateAddressFields(event.detail)) {
      const parts = getAddressParts();

      fillAddressFields(parts);
    } else {
      const fields = [AddressField.Number, AddressField.NumberSuffix, AddressField.Street];

      const [number, street, suffix] = fields.map((fieldName) => getFieldValue(fieldName) ?? '');

      setFieldValue(AddressField.Address1, `${street} ${number} ${suffix}`.trim(), addressType);
    }
  });
};
