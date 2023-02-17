/* eslint-disable @typescript-eslint/no-magic-numbers */
import {
  AGE_CHECK,
  CARRIER,
  DIRECT_RETURN,
  INSURANCE,
  LABEL_AMOUNT,
  LARGE_FORMAT,
  ONLY_RECIPIENT,
  PACKAGE_TYPE,
  SAME_DAY_DELIVERY,
  SIGNATURE,
} from './field';
import {CarrierName, PACKAGE_TYPES, PackageTypeName} from '@myparcel/sdk';
import {
  defineFormField,
  getInsurancePossibilities,
  getPackageTypes,
  hasShipmentOption,
  isPackageTypePackage,
} from './helpers';
import {ref, resolveComponent} from 'vue';
import {useContext, useFormatter} from '../../composables';
import {AdminContextKey} from '../../types';
import {Plugin} from '@myparcel-pdk/common/src';
import {createShipmentFormName} from '../../utils';
import {defineForm} from '@myparcel/vue-form-builder/src';
import {useCarrier} from '../../sdk';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,max-lines-per-function
export const createShipmentOptionsForm = (order: Plugin.ModelPdkOrder) => {
  const dynamicContext = useContext(AdminContextKey.DYNAMIC);

  const carrierNames = dynamicContext.carrierOptions.map((options) => options.carrier.name);

  const formatter = useFormatter();

  return defineForm(createShipmentFormName(order.externalIdentifier), {
    fields: [
      defineFormField({
        name: CARRIER,
        label: 'carrier',
        ref: ref<CarrierName>(order.deliveryOptions?.carrier as CarrierName),
        component: resolveComponent('PdkSelectInput'),
        props: {
          options: [],
        },

        // @ts-expect-error todo
        onBeforeMount: async (field) => {
          const carriers = await Promise.all(
            carrierNames.map(async (name) => {
              const carrier = useCarrier(name);
              return carrier.suspense();
            }),
          );

          field.props.options = carriers.map((carrier) => ({
            label: carrier.data?.human,
            value: carrier.data?.name,
          }));
        },

        afterUpdate: ({form}) => {
          // @ts-expect-error options exists
          form.model[INSURANCE].props.options = getInsurancePossibilities(form).map((amount) => ({
            label: formatter.format('currency', amount),
            value: amount,
          }));

          // @ts-expect-error options exists
          form.model[PACKAGE_TYPE].props.options = getPackageTypes(form);
        },
      }),

      defineFormField({
        name: LABEL_AMOUNT,
        label: 'label_amount',
        ref: ref(order.deliveryOptions?.labelAmount ?? 1),
        component: resolveComponent('PdkNumberInput'),
        props: {
          min: 1,
          max: 10,
        },
      }),

      defineFormField({
        name: PACKAGE_TYPE,
        label: 'shipment_options_package_type',
        ref: ref<PackageTypeName>((order.deliveryOptions?.packageType as PackageTypeName) ?? PACKAGE_TYPES.PACKAGE),
        component: resolveComponent('PdkSelectInput'),
        props: {
          options: getPackageTypes(),
        },
      }),

      defineFormField({
        name: SIGNATURE,
        label: 'shipment_options_signature',
        ref: ref(order.deliveryOptions?.shipmentOptions.signature ?? false),
        component: resolveComponent('PdkToggleInput'),
        visibleWhen: ({form}) => {
          return isPackageTypePackage(form) && hasShipmentOption(form, 'signature');
        },
      }),

      defineFormField({
        name: ONLY_RECIPIENT,
        label: 'shipment_options_only_recipient',
        ref: ref(order.deliveryOptions?.shipmentOptions.onlyRecipient ?? false),
        component: resolveComponent('PdkToggleInput'),
        visibleWhen: ({form}) => {
          return isPackageTypePackage(form) && hasShipmentOption(form, 'onlyRecipient');
        },
      }),

      defineFormField({
        name: AGE_CHECK,
        component: resolveComponent('PdkToggleInput'),
        ref: ref(order.deliveryOptions?.shipmentOptions.ageCheck ?? false),
        label: 'shipment_options_age_check',
        visibleWhen: ({form}) => {
          return isPackageTypePackage(form) && hasShipmentOption(form, 'ageCheck');
        },
      }),

      defineFormField({
        name: DIRECT_RETURN,
        component: resolveComponent('PdkToggleInput'),
        ref: ref(order.deliveryOptions?.shipmentOptions.return ?? false),
        label: 'shipment_options_return',
        visibleWhen: ({form}) => {
          return isPackageTypePackage(form) && hasShipmentOption(form, 'return');
        },
      }),

      defineFormField({
        name: LARGE_FORMAT,
        component: resolveComponent('PdkToggleInput'),
        ref: ref(order.deliveryOptions?.shipmentOptions.largeFormat ?? false),
        label: 'shipment_options_large_format',
        visibleWhen: ({form}) => {
          return isPackageTypePackage(form) && hasShipmentOption(form, 'largeFormat');
        },
      }),

      defineFormField({
        name: SAME_DAY_DELIVERY,
        component: resolveComponent('PdkToggleInput'),
        ref: ref(order.deliveryOptions?.shipmentOptions.sameDayDelivery ?? false),
        label: 'shipment_options_same_day_delivery',
        visibleWhen: ({form}) => {
          return isPackageTypePackage(form) && hasShipmentOption(form, 'sameDayDelivery');
        },
      }),

      defineFormField({
        name: INSURANCE,
        component: resolveComponent('PdkSelectInput'),
        ref: ref(order.deliveryOptions?.shipmentOptions.insurance ?? 0),
        label: 'shipment_options_insurance',

        props: {
          options: [],
        },

        visibleWhen: ({form}) => {
          return isPackageTypePackage(form) && hasShipmentOption(form, 'insurance');
        },
      }),
    ],
  });
};
