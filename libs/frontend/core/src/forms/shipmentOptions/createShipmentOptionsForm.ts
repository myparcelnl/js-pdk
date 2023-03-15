/* eslint-disable @typescript-eslint/no-magic-numbers */
// noinspection JSUnusedGlobalSymbols

import {
  AGE_CHECK,
  CARRIER,
  DIRECT_RETURN,
  INSURANCE,
  LABEL_AMOUNT,
  LARGE_FORMAT,
  ONLY_RECIPIENT,
  PACKAGE_TYPE,
  PROP_OPTIONS,
  SAME_DAY_DELIVERY,
  SIGNATURE,
} from './field';
import {AdminComponent, Plugin} from '@myparcel-pdk/common/src';
import {AdminContextKey, AdminModalKey, ElementInstance} from '../../types';
import {CarrierName, PackageTypeName} from '@myparcel/constants';
import {defineFormField, resolveFormComponent, setFieldProp} from '../helpers';
import {getPackageTypes, hasShipmentOption, isPackageTypePackage} from './helpers';
import {useAdminConfig, useContext, useLocalizedFormatter} from '../../composables';
import {createShipmentFormName} from '../../utils';
import {defineForm} from '@myparcel/vue-form-builder/src';
import {getFormattedInsurancePossibilities} from './helpers/getFormattedInsurancePossibilities';
import {ref} from 'vue';
import {useCarrier} from '../../sdk';
import {useModalStore} from '../../stores';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,max-lines-per-function,complexity
export const createShipmentOptionsForm = (order: Plugin.ModelPdkOrder) => {
  const dynamicContext = useContext(AdminContextKey.Dynamic);
  const config = useAdminConfig();
  const modalStore = useModalStore();

  const carrierNames = dynamicContext.carrierOptions.map((options) => options.carrier.name);
  const formatter = useLocalizedFormatter();

  return defineForm(createShipmentFormName(order.externalIdentifier), {
    ...(modalStore.opened === AdminModalKey.ShipmentOptions ? config.formConfigOverrides?.modal : null),
    ...config.formConfigOverrides?.shipmentOptions,
    fields: [
      defineFormField({
        name: CARRIER,
        label: 'carrier',
        ref: ref<CarrierName>(order.deliveryOptions?.carrier as CarrierName),
        component: resolveFormComponent(AdminComponent.SelectInput),

        // @ts-expect-error todo
        onBeforeMount: async (field) => {
          const carriers = await Promise.all(
            carrierNames.map(async (name) => {
              const carrier = useCarrier(name);
              return carrier.suspense();
            }),
          );

          setFieldProp(
            field,
            PROP_OPTIONS,
            carriers.map((carrier) => ({
              label: carrier.data?.human,
              value: carrier.data?.name,
            })),
          );
        },

        afterUpdate: (field) => {
          setFieldProp(field.form, INSURANCE, PROP_OPTIONS, getFormattedInsurancePossibilities(field, formatter));
          setFieldProp(field.form, PACKAGE_TYPE, PROP_OPTIONS, getPackageTypes(field.form));
        },
      }),

      defineFormField({
        name: LABEL_AMOUNT,
        label: 'label_amount',
        ref: ref(order.deliveryOptions?.labelAmount ?? 1),
        component: resolveFormComponent(AdminComponent.NumberInput),
        props: {
          min: 1,
          max: 10,
        },
      }),

      defineFormField({
        name: PACKAGE_TYPE,
        label: 'shipment_options_package_type',
        ref: ref<PackageTypeName>((order.deliveryOptions?.packageType as PackageTypeName) ?? PackageTypeName.Package),
        component: resolveFormComponent(AdminComponent.SelectInput),
      }),

      defineFormField({
        name: SIGNATURE,
        label: 'shipment_options_signature',
        ref: ref(order.deliveryOptions?.shipmentOptions.signature ?? false),
        component: resolveFormComponent(AdminComponent.ToggleInput),
        visibleWhen: ({form}) => isPackageTypePackage(form) && hasShipmentOption(form, 'signature'),
      }),

      defineFormField({
        name: ONLY_RECIPIENT,
        label: 'shipment_options_only_recipient',
        ref: ref(order.deliveryOptions?.shipmentOptions.onlyRecipient ?? false),
        component: resolveFormComponent(AdminComponent.ToggleInput),
        visibleWhen: ({form}) => isPackageTypePackage(form) && hasShipmentOption(form, 'onlyRecipient'),
      }),

      defineFormField({
        name: AGE_CHECK,
        component: resolveFormComponent(AdminComponent.ToggleInput),
        ref: ref(order.deliveryOptions?.shipmentOptions.ageCheck ?? false),
        label: 'shipment_options_age_check',
        visibleWhen: ({form}) => isPackageTypePackage(form) && hasShipmentOption(form, 'ageCheck'),
      }),

      defineFormField({
        name: DIRECT_RETURN,
        component: resolveFormComponent(AdminComponent.ToggleInput),
        ref: ref(order.deliveryOptions?.shipmentOptions.return ?? false),
        label: 'shipment_options_return',
        visibleWhen: ({form}) => isPackageTypePackage(form) && hasShipmentOption(form, 'return'),
      }),

      defineFormField({
        name: LARGE_FORMAT,
        component: resolveFormComponent(AdminComponent.ToggleInput),
        ref: ref(order.deliveryOptions?.shipmentOptions.largeFormat ?? false),
        label: 'shipment_options_large_format',
        visibleWhen: ({form}) => isPackageTypePackage(form) && hasShipmentOption(form, 'largeFormat'),
      }),

      defineFormField({
        name: SAME_DAY_DELIVERY,
        component: resolveFormComponent(AdminComponent.ToggleInput),
        ref: ref(order.deliveryOptions?.shipmentOptions.sameDayDelivery ?? false),
        label: 'shipment_options_same_day_delivery',
        visibleWhen: ({form}) => isPackageTypePackage(form) && hasShipmentOption(form, 'sameDayDelivery'),
      }),

      defineFormField({
        name: INSURANCE,
        component: resolveFormComponent(AdminComponent.SelectInput),
        ref: ref(order.deliveryOptions?.shipmentOptions.insurance ?? 0),
        label: 'shipment_options_insurance',
        props: {
          options: [],
        },

        visibleWhen: ({form}) => isPackageTypePackage(form) && hasShipmentOption(form, 'insurance'),

        onBeforeMount: (field: ElementInstance) => {
          setFieldProp(field, PROP_OPTIONS, getFormattedInsurancePossibilities(field, formatter));
        },
      }),
    ],
  });
};
