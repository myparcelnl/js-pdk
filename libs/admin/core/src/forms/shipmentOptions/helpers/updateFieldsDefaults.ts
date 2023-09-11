import {get as lodashGet} from 'lodash-es';
import {get} from '@vueuse/core/index';
import {type Shipment} from '@myparcel-pdk/admin-common';
import {type InteractiveElementInstance} from '@myparcel/vue-form-builder';

/**
 * Update the default values of the fields based on the carrier, so the tri-state defaults are correct.
 */
export const updateFieldsDefaults = (
  carrier: string,
  {form, name}: InteractiveElementInstance,
  inheritedDeliveryOptions: Record<string, Shipment.ModelDeliveryOptions>,
): void => {
  get(form.fields).forEach((otherField) => {
    if (otherField.name === name) {
      return;
    }

    const optionPathParts = otherField.name.split('.');

    // Remove the deliveryOptions prefix
    optionPathParts.shift();

    otherField.props.defaultValue = lodashGet(inheritedDeliveryOptions, [carrier, ...optionPathParts]);
  });
};
