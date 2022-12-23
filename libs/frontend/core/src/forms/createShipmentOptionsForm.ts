/* eslint-disable @typescript-eslint/no-magic-numbers */
import {CARRIERS, CarrierName, PACKAGE_TYPES, PackageTypeName} from '@myparcel/sdk';
import {defineField, defineForm} from '@myparcel/vue-form-builder';
import {ModalKey} from '../types';
import {Plugin} from '@myparcel-pdk/common';
import {ref} from 'vue';
import {renderWithFormGroup} from './renderWithFormGroup';
import {useCarriers} from '../sdk';
import {useTranslate} from '../composables';

const deliveryOptionsPrefix = 'deliveryOptions';
const shipmentOptionsPrefix = `${deliveryOptionsPrefix}.shipmentOptions`;

const carrier = `${deliveryOptionsPrefix}.carrier`;
const labelAmount = `${deliveryOptionsPrefix}.labelAmount`;
const packageType = `${deliveryOptionsPrefix}.packageType`;
const signature = `${shipmentOptionsPrefix}.signature`;
const onlyRecipient = `${shipmentOptionsPrefix}.onlyRecipient`;
const ageCheck = `${shipmentOptionsPrefix}.ageCheck`;
const directReturn = `${shipmentOptionsPrefix}.return`;
const largeFormat = `${shipmentOptionsPrefix}.largeFormat`;
const sameDayDelivery = `${shipmentOptionsPrefix}.sameDayDelivery`;
const insurance = `${shipmentOptionsPrefix}.insurance`;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,max-lines-per-function
export const createShipmentOptionsForm = (order: Plugin.ModelPdkOrder) => {
  const translate = useTranslate();

  const form = defineForm(`${ModalKey.SHIPMENT_OPTIONS}_${order.externalIdentifier}`, {
    fields: [
      defineField({
        name: carrier,
        label: 'carrier',
        component: renderWithFormGroup('PdkSelectInput'),
        ref: ref<CarrierName>(order.deliveryOptions?.carrier as CarrierName),
        props: {
          options: [],
        },

        // @ts-expect-error todo
        onBeforeMount: async (field) => {
          const carriers = useCarriers();
          await carriers.suspense();

          field.props.options =
            // @ts-expect-error todo
            carriers.data.value?.map((carrier) => ({
              label: carrier.human,
              value: carrier.name,
            })) ?? [];
        },
      }),

      defineField({
        name: labelAmount,
        component: renderWithFormGroup('PdkNumberInput'),
        ref: ref(order.deliveryOptions?.labelAmount ?? 1),
        label: 'label_amount',
        props: {
          min: 1,
          max: 10,
        },
      }),

      defineField({
        name: packageType,
        component: renderWithFormGroup('PdkSelectInput'),
        ref: ref<PackageTypeName>((order.deliveryOptions?.packageType as PackageTypeName) ?? PACKAGE_TYPES.PACKAGE),
        label: 'shipment_options_package_type',
        props: {
          options: PACKAGE_TYPES.ALL.map((type) => ({
            label: translate(`package_type_${type.NAME}`),
            value: type.NAME,
          })),
        },
      }),

      defineField({
        name: signature,
        component: renderWithFormGroup('PdkToggleInput'),
        ref: ref(order.deliveryOptions?.shipmentOptions.signature ?? false),
        label: 'shipment_options_signature',

        // @ts-expect-error todo
        visibleCb: ({form}) => form.model[packageType].ref === PACKAGE_TYPES.PACKAGE_NAME,
      }),

      defineField({
        name: onlyRecipient,
        component: renderWithFormGroup('PdkToggleInput'),
        ref: ref(order.deliveryOptions?.shipmentOptions.onlyRecipient ?? false),
        label: 'shipment_options_only_recipient',

        // @ts-expect-error todo
        visibleCb: ({form}) => form.model[packageType].ref === PACKAGE_TYPES.PACKAGE_NAME,
      }),

      defineField({
        name: ageCheck,
        component: renderWithFormGroup('PdkToggleInput'),
        ref: ref(order.deliveryOptions?.shipmentOptions.ageCheck ?? false),
        label: 'shipment_options_age_check',

        // @ts-expect-error todo
        visibleCb: ({form}) => form.model[packageType].ref === PACKAGE_TYPES.PACKAGE_NAME,
      }),

      defineField({
        name: directReturn,
        component: renderWithFormGroup('PdkToggleInput'),
        ref: ref(order.deliveryOptions?.shipmentOptions.return ?? false),
        label: 'shipment_options_return',

        // @ts-expect-error todo
        visibleCb: ({form}) => form.model[packageType].ref === PACKAGE_TYPES.PACKAGE_NAME,
      }),

      defineField({
        name: largeFormat,
        component: renderWithFormGroup('PdkToggleInput'),
        ref: ref(order.deliveryOptions?.shipmentOptions.largeFormat ?? false),
        label: 'shipment_options_large_format',

        // @ts-expect-error todo
        visibleCb: ({form}) => {
          return form.model[packageType].ref === PACKAGE_TYPES.PACKAGE_NAME;
        },
      }),

      defineField({
        name: sameDayDelivery,
        component: renderWithFormGroup('PdkToggleInput'),
        ref: ref(order.deliveryOptions?.shipmentOptions.sameDayDelivery ?? false),
        label: 'shipment_options_same_day_delivery',

        // @ts-expect-error todo
        visibleCb: ({form}) => {
          return (
            form.model[packageType].ref === PACKAGE_TYPES.PACKAGE_NAME &&
            ['dhlforyou', CARRIERS.INSTABOX_NAME].includes(form.model[carrier].ref)
          );
        },
      }),

      defineField({
        name: insurance,
        component: renderWithFormGroup('PdkNumberInput'),
        ref: ref(order.deliveryOptions?.shipmentOptions.insurance ?? 0),
        label: 'shipment_options_insurance',
        validate: (field, value: number) => value > 100,
        errorMessage: 'Insurance must be at least 100',

        // @ts-expect-error todo
        visibleCb: ({form}) => {
          return form.model[packageType].ref === PACKAGE_TYPES.PACKAGE_NAME;
        },
        // TODO: CAUSES INFINITE LOOP
        // optionalCb: () => true,
      }),
    ],
  });

  return form;
};
