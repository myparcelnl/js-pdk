import {CARRIERS, PACKAGE_TYPES} from '@myparcel/sdk';
import {defineField, defineForm} from '@myparcel/vue-form-builder';
import {useOrderQuery, useTranslate} from '../composables';
import {ref} from 'vue';
import {renderWithFormGroup} from './renderWithFormGroup';
import {useCarriers} from '../sdk';

const deliveryOptionsCarrier = 'deliveryOptions.carrier';
const deliveryOptionsLabelAmount = 'deliveryOptions.labelAmount';
const deliveryOptionsPackageType = 'deliveryOptions.packageType';
const deliveryOptionsShipmentOptionsSignature = 'deliveryOptions.shipmentOptions.signature';
const deliveryOptionsShipmentOptionsOnlyRecipient = 'deliveryOptions.shipmentOptions.onlyRecipient';
const deliveryOptionsShipmentOptionsAgeCheck = 'deliveryOptions.shipmentOptions.ageCheck';
const deliveryOptionsShipmentOptionsReturn = 'deliveryOptions.shipmentOptions.return';
const deliveryOptionsShipmentOptionsLargeFormat = 'deliveryOptions.shipmentOptions.largeFormat';
const deliveryOptionsShipmentOptionsSameDayDelivery = 'deliveryOptions.shipmentOptions.sameDayDelivery';
const deliveryOptionsShipmentOptionsInsurance = 'deliveryOptions.shipmentOptions.insurance';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,max-lines-per-function
export const createShipmentOptionsForm = (id: string) => {
  const translate = useTranslate();
  const order = useOrderQuery(id);

  return defineForm(`shipmentOptions${id}`, {
    fields: [
      defineField({
        name: deliveryOptionsCarrier,
        label: 'carrier',
        component: renderWithFormGroup('PdkSelect'),
        ref: ref(order.data.value?.deliveryOptions?.carrier),
        props: {
          options: [],
        },

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        onBeforeMount: async (field) => {
          const carriers = useCarriers();
          await carriers.suspense();

          field.props.options =
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            carriers.data.value?.map((carrier) => ({
              label: carrier.human,
              value: carrier.name,
            })) ?? [];
        },
      }),

      defineField({
        name: deliveryOptionsLabelAmount,
        component: renderWithFormGroup('PdkNumberInput'),
        ref: ref(order.data.value?.deliveryOptions?.labelAmount),
        label: 'label_amount',
        props: {
          min: 1,
          max: 10,
        },
      }),

      defineField({
        name: deliveryOptionsPackageType,
        component: renderWithFormGroup('PdkSelect'),
        ref: ref(order.data.value?.deliveryOptions?.packageType),
        label: 'shipment_options_package_type',
        props: {
          options: PACKAGE_TYPES.ALL.map((type) => ({
            label: translate(`package_type_${type.NAME}`),
            value: type.NAME,
          })),
        },
      }),

      defineField({
        name: deliveryOptionsShipmentOptionsSignature,
        component: renderWithFormGroup('PdkToggle'),
        ref: ref(order.data.value?.deliveryOptions?.shipmentOptions.signature),
        label: 'shipment_options_signature',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        visibleCb: (field) => field.form.model[deliveryOptionsPackageType].ref === PACKAGE_TYPES.PACKAGE_NAME,
      }),

      defineField({
        name: deliveryOptionsShipmentOptionsOnlyRecipient,
        component: renderWithFormGroup('PdkToggle'),
        ref: ref(order.data.value?.deliveryOptions?.shipmentOptions.onlyRecipient),
        label: 'shipment_options_only_recipient',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        visibleCb: (field) => field.form.model[deliveryOptionsPackageType].ref === PACKAGE_TYPES.PACKAGE_NAME,
      }),

      defineField({
        name: deliveryOptionsShipmentOptionsAgeCheck,
        component: renderWithFormGroup('PdkToggle'),
        ref: ref(order.data.value?.deliveryOptions?.shipmentOptions.ageCheck),
        label: 'shipment_options_age_check',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        visibleCb: (field) => field.form.model[deliveryOptionsPackageType].ref === PACKAGE_TYPES.PACKAGE_NAME,
      }),

      defineField({
        name: deliveryOptionsShipmentOptionsReturn,
        component: renderWithFormGroup('PdkToggle'),
        ref: ref(order.data.value?.deliveryOptions?.shipmentOptions.return),
        label: 'shipment_options_return',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        visibleCb: (field) => field.form.model[deliveryOptionsPackageType].ref === PACKAGE_TYPES.PACKAGE_NAME,
      }),

      defineField({
        name: deliveryOptionsShipmentOptionsLargeFormat,
        component: renderWithFormGroup('PdkToggle'),
        ref: ref(order.data.value?.deliveryOptions?.shipmentOptions.largeFormat),
        label: 'shipment_options_large_format',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        visibleCb: (field) => field.form.model[deliveryOptionsPackageType].ref === PACKAGE_TYPES.PACKAGE_NAME,
      }),

      defineField({
        name: deliveryOptionsShipmentOptionsSameDayDelivery,
        component: renderWithFormGroup('PdkToggle'),
        ref: ref(order.data.value?.deliveryOptions?.shipmentOptions.sameDayDelivery),
        label: 'shipment_options_same_day_delivery',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        visibleCb: ({form}) => {
          return (
            form.model[deliveryOptionsPackageType].ref === PACKAGE_TYPES.PACKAGE_NAME &&
            ['dhlforyou', CARRIERS.INSTABOX_NAME].includes(form.model[deliveryOptionsCarrier].ref)
          );
        },
      }),

      defineField({
        name: deliveryOptionsShipmentOptionsInsurance,
        component: renderWithFormGroup('PdkNumberInput'),
        ref: ref(order.data.value?.deliveryOptions?.shipmentOptions.insurance),
        label: 'shipment_options_insurance',
        validate: (field, value: number) => value > 100,
        errorMessage: 'Insurance must be at least 100',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        visibleCb: (field) => field.form.model[deliveryOptionsPackageType].ref === PACKAGE_TYPES.PACKAGE_NAME,
        optionalCb: () => true,
      }),
    ],
  });
};
