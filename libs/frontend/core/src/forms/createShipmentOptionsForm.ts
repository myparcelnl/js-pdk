/* eslint-disable @typescript-eslint/no-magic-numbers */
import {CARRIERS, CarrierName, PACKAGE_TYPES, PackageTypeName} from '@myparcel/sdk';
import {InteractiveElementConfiguration, defineField, defineForm} from '@myparcel/vue-form-builder/src';
import {ref, resolveComponent} from 'vue';
import {useContext, useLanguage} from '../composables';
import {AdminContextKey} from '../types';
import {Plugin} from '@myparcel-pdk/common/src';
import {createShipmentFormName} from '../utils';
import {useCarriers} from '../sdk';

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

export const defineFormField = (config: InteractiveElementConfiguration): InteractiveElementConfiguration => {
  const {label} = config;

  return defineField({
    ...config,
    props: {
      description: `${label}_description`,
      ...config.props,
    },
  });
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,max-lines-per-function
export const createShipmentOptionsForm = (order: Plugin.ModelPdkOrder) => {
  const {translate} = useLanguage();

  return defineForm(createShipmentFormName(order.externalIdentifier), {
    fields: [
      defineFormField({
        name: carrier,
        label: 'carrier',
        ref: ref<CarrierName>(order.deliveryOptions?.carrier as CarrierName),
        component: resolveComponent('PdkSelectInput'),
        props: {
          options: [],
        },

        // @ts-expect-error todo
        onBeforeMount: async (field) => {
          const dynamicContext = useContext(AdminContextKey.DYNAMIC);
          const carrierNames = dynamicContext.carrierOptions.map((options) => options.carrier.name);

          const carriers = useCarriers();
          await carriers.suspense();

          field.props.options =
            carriers.data.value
              ?.filter((carrier) => carrierNames.includes(carrier.name))
              .map((carrier) => ({
                label: carrier.human,
                value: carrier.name,
              })) ?? [];
        },
      }),

      defineFormField({
        name: labelAmount,
        label: 'label_amount',
        ref: ref(order.deliveryOptions?.labelAmount ?? 1),
        component: resolveComponent('PdkNumberInput'),
        props: {
          min: 1,
          max: 10,
        },
      }),

      defineFormField({
        name: packageType,
        label: 'shipment_options_package_type',
        ref: ref<PackageTypeName>((order.deliveryOptions?.packageType as PackageTypeName) ?? PACKAGE_TYPES.PACKAGE),
        component: resolveComponent('PdkSelectInput'),
        props: {
          options: PACKAGE_TYPES.ALL.map((type) => ({
            label: translate(`package_type_${type.NAME}`),
            value: type.NAME,
          })),
        },
      }),

      defineFormField({
        name: signature,
        label: 'shipment_options_signature',
        ref: ref(order.deliveryOptions?.shipmentOptions.signature ?? false),
        component: resolveComponent('PdkToggleInput'),

        // @ts-expect-error todo
        visibleCb: ({form}) => form.model[packageType].ref === PACKAGE_TYPES.PACKAGE_NAME,
      }),

      defineFormField({
        name: onlyRecipient,
        label: 'shipment_options_only_recipient',
        ref: ref(order.deliveryOptions?.shipmentOptions.onlyRecipient ?? false),
        component: resolveComponent('PdkToggleInput'),
        // @ts-expect-error todo
        visibleCb: ({form}) => form.model[packageType].ref === PACKAGE_TYPES.PACKAGE_NAME,
      }),

      defineFormField({
        name: ageCheck,
        component: resolveComponent('PdkToggleInput'),
        ref: ref(order.deliveryOptions?.shipmentOptions.ageCheck ?? false),
        label: 'shipment_options_age_check',

        // @ts-expect-error todo
        visibleCb: ({form}) => form.model[packageType].ref === PACKAGE_TYPES.PACKAGE_NAME,
      }),

      defineFormField({
        name: directReturn,
        component: resolveComponent('PdkToggleInput'),
        ref: ref(order.deliveryOptions?.shipmentOptions.return ?? false),
        label: 'shipment_options_return',

        // @ts-expect-error todo
        visibleCb: ({form}) => form.model[packageType].ref === PACKAGE_TYPES.PACKAGE_NAME,
      }),

      defineFormField({
        name: largeFormat,
        component: resolveComponent('PdkToggleInput'),
        ref: ref(order.deliveryOptions?.shipmentOptions.largeFormat ?? false),
        label: 'shipment_options_large_format',

        // @ts-expect-error todo
        visibleCb: ({form}) => {
          return form.model[packageType].ref === PACKAGE_TYPES.PACKAGE_NAME;
        },
      }),

      defineFormField({
        name: sameDayDelivery,
        component: resolveComponent('PdkToggleInput'),
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

      defineFormField({
        name: insurance,
        component: resolveComponent('PdkNumberInput'),
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
};
