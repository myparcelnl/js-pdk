import {toRaw} from 'vue';
import {get} from 'lodash-unified';
import {type Plugin} from '@myparcel-pdk/common';
import {defineForm, type FormInstance} from '@myparcel/vue-form-builder';
import {type OneOrMore, toArray} from '@myparcel/ts-utils';
import {addBulkEditNotification} from '../helpers/addBulkEditNotification';
import {createShipmentFormName} from '../../utils/forms/createShipmentFormName';
import {useModalStore} from '../../stores/useModalStore';
import {AdminModalKey} from '../../data/constants';
import {useAdminConfig} from '../../composables/useAdminConfig';
import {type ShipmentOptionsRefs} from './types';
import {createSignatureField} from './fields/createSignatureField';
import {createSameDayDeliveryField} from './fields/createSameDayDeliveryField';
import {createPackageTypeField} from './fields/createPackageTypeField';
import {createOnlyRecipientField} from './fields/createOnlyRecipientField';
import {createLargeFormatField} from './fields/createLargeFormatField';
import {createLabelAmountField} from './fields/createLabelAmountField';
import {createInsuranceField} from './fields/createInsuranceField';
import {createHideSenderField} from './fields/createHideSenderField';
import {createDirectReturnField} from './fields/createDirectReturnField';
import {createDigitalStampRangeField} from './fields/createDigitalStampRangeField';
import {createCarrierField} from './fields/createCarrierField';
import {createAgeCheckField} from './fields/createAgeCheckField';
import {ALL_FIELDS, FIELD_CARRIER} from './field';

export const createShipmentOptionsForm = (orders?: OneOrMore<Plugin.ModelPdkOrder>): FormInstance => {
  const ordersArray = toArray(orders ?? []).map(toRaw);

  const config = useAdminConfig();
  const modalStore = useModalStore();

  const isBulk = ordersArray.length > 1;
  const isModal = AdminModalKey.ShipmentOptions === modalStore.opened;

  if (isBulk) {
    addBulkEditNotification(isModal);
  }

  const order = ((isBulk ? undefined : ordersArray[0]) ?? {}) as Plugin.ModelContextOrderDataContext;

  const refs = ALL_FIELDS.reduce((acc, fieldName) => {
    acc[fieldName] = get(order, fieldName);

    return acc;
  }, {} as ShipmentOptionsRefs);

  refs[FIELD_CARRIER] = get(order, `${FIELD_CARRIER}.externalIdentifier`);

  return defineForm(createShipmentFormName(order.externalIdentifier), {
    ...(isModal ? config.formConfigOverrides?.modal : null),
    ...config.formConfigOverrides?.shipmentOptions,
    fields: [
      createCarrierField(refs, order.inheritedDeliveryOptions),

      createPackageTypeField(refs),

      createLabelAmountField(refs),

      createDigitalStampRangeField(refs),

      createAgeCheckField(refs),
      createSignatureField(refs),
      createOnlyRecipientField(refs),
      createDirectReturnField(refs),
      createLargeFormatField(refs),
      createHideSenderField(refs),
      createSameDayDeliveryField(refs),

      createInsuranceField(refs),
    ],
  });
};
