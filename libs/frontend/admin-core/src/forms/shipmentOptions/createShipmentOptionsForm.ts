/* eslint-disable @typescript-eslint/no-magic-numbers */
// noinspection JSUnusedGlobalSymbols

import {markRaw, ref} from 'vue';
import {get} from '@vueuse/core';
import {AdminComponent, type Plugin} from '@myparcel-pdk/common';
import {defineForm} from '@myparcel/vue-form-builder';
import {type OneOrMore, toArray, type PromiseOr} from '@myparcel/ts-utils';
import {type CarrierName, PackageTypeName} from '@myparcel/constants';
import {defineFormField, resolveFormComponent, setFieldProp} from '../helpers';
import {createShipmentFormName} from '../../utils';
import {AdminContextKey, AdminModalKey, type ElementInstance, type RadioGroupOption} from '../../types';
import {useModalStore} from '../../stores';
import {useCarrier} from '../../sdk';
import {useAdminConfig, useAssetUrl, useContext, useLocalizedFormatter} from '../../composables';
import {
  addBulkEditNotification,
  getFormattedInsurancePossibilities,
  getPackageTypes,
  hasShipmentOption,
  isPackageTypePackage,
} from './helpers';
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

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,max-lines-per-function,complexity
export const createShipmentOptionsForm = (orders?: OneOrMore<Plugin.ModelPdkOrder>) => {
  const ordersArray = toArray(orders ?? []);
  ordersArray.forEach((order) => markRaw(order));

  const dynamicContext = useContext(AdminContextKey.Dynamic);

  const config = useAdminConfig();
  const modalStore = useModalStore();
  const formatter = useLocalizedFormatter();

  const isBulk = ordersArray.length > 1;
  const isModal = modalStore.opened === AdminModalKey.ShipmentOptions;

  if (isBulk) {
    addBulkEditNotification(isModal);
  }

  const values: Partial<Plugin.ModelPdkOrder> = (isBulk ? undefined : ordersArray[0]) ?? {};

  const name = createShipmentFormName(values.externalIdentifier);

  if (!name) {
    throw new Error('No form name found');
  }

  return defineForm(name, {
    ...(isModal ? config.formConfigOverrides?.modal : null),
    ...config.formConfigOverrides?.shipmentOptions,
    fields: [
      defineFormField({
        name: CARRIER,
        label: 'carrier',
        ref: ref<CarrierName>(values.deliveryOptions?.carrier as CarrierName),
        component: resolveFormComponent(AdminComponent.RadioGroup),
        props: {
          options: [],
        },

        // @ts-expect-error todo
        onBeforeMount: async (field) => {
          const carrierSelectOptions = await Promise.all(
            dynamicContext.carrierOptions.map(async (options): Promise<RadioGroupOption> => {
              const query = useCarrier(options.carrier.name);
              await query.suspense();
              const data = get(query.data);

              return {
                plainLabel: data?.human ?? '',
                value: data?.name ?? '',
                image: useAssetUrl(data?.meta.logo_svg ?? ''),
              };
            }),
          );

          setFieldProp(field, PROP_OPTIONS, carrierSelectOptions);

          field.afterUpdate(field);
        },

        afterUpdate: (field) => {
          setFieldProp(field.form, INSURANCE, PROP_OPTIONS, getFormattedInsurancePossibilities(field, formatter));
          setFieldProp(field.form, PACKAGE_TYPE, PROP_OPTIONS, getPackageTypes(field.form));
        },
      }),

      defineFormField({
        name: LABEL_AMOUNT,
        label: 'label_amount',
        ref: ref(values.deliveryOptions?.labelAmount ?? 1),
        component: resolveFormComponent(AdminComponent.NumberInput),
        props: {
          min: 1,
          max: 10,
        },
      }),

      defineFormField({
        name: PACKAGE_TYPE,
        label: 'shipment_options_package_type',
        ref: ref<PackageTypeName>((values.deliveryOptions?.packageType as PackageTypeName) ?? PackageTypeName.Package),
        component: resolveFormComponent(AdminComponent.RadioGroup),
      }),

      defineFormField({
        name: SIGNATURE,
        label: 'shipment_options_signature',
        ref: ref(values.deliveryOptions?.shipmentOptions.signature ?? false),
        component: resolveFormComponent(AdminComponent.ToggleInput),
        visibleWhen: ({form}) => isPackageTypePackage(form) && hasShipmentOption(form, 'signature'),
      }),

      defineFormField({
        name: ONLY_RECIPIENT,
        label: 'shipment_options_only_recipient',
        ref: ref(values.deliveryOptions?.shipmentOptions.onlyRecipient ?? false),
        component: resolveFormComponent(AdminComponent.ToggleInput),
        visibleWhen: ({form}) => isPackageTypePackage(form) && hasShipmentOption(form, 'onlyRecipient'),
      }),

      defineFormField({
        name: AGE_CHECK,
        component: resolveFormComponent(AdminComponent.ToggleInput),
        ref: ref(values.deliveryOptions?.shipmentOptions.ageCheck ?? false),
        label: 'shipment_options_age_check',
        visibleWhen: ({form}) => isPackageTypePackage(form) && hasShipmentOption(form, 'ageCheck'),
        afterUpdate(field, value): PromiseOr<void> {
          const signatureField = field.form.fields.value.find((field) => field.name === SIGNATURE);
          const onlyRecipientField = field.form.fields.value.find((field) => field.name === ONLY_RECIPIENT);

          if (value === true) {
            if (signatureField) {
              signatureField.ref = true;
            }

            if (onlyRecipientField) {
              onlyRecipientField.ref = true;
            }
          }
        },
      }),

      defineFormField({
        name: DIRECT_RETURN,
        component: resolveFormComponent(AdminComponent.ToggleInput),
        ref: ref(values.deliveryOptions?.shipmentOptions.return ?? false),
        label: 'shipment_options_return',
        visibleWhen: ({form}) => isPackageTypePackage(form) && hasShipmentOption(form, 'return'),
      }),

      defineFormField({
        name: LARGE_FORMAT,
        component: resolveFormComponent(AdminComponent.ToggleInput),
        ref: ref(values.deliveryOptions?.shipmentOptions.largeFormat ?? false),
        label: 'shipment_options_large_format',
        visibleWhen: ({form}) => isPackageTypePackage(form) && hasShipmentOption(form, 'largeFormat'),
      }),

      defineFormField({
        name: SAME_DAY_DELIVERY,
        component: resolveFormComponent(AdminComponent.ToggleInput),
        ref: ref(values.deliveryOptions?.shipmentOptions.sameDayDelivery ?? false),
        label: 'shipment_options_same_day_delivery',
        visibleWhen: ({form}) => isPackageTypePackage(form) && hasShipmentOption(form, 'sameDayDelivery'),
      }),

      defineFormField({
        name: INSURANCE,
        component: resolveFormComponent(AdminComponent.SelectInput),
        ref: ref(values.deliveryOptions?.shipmentOptions.insurance ?? 0),
        label: 'shipment_options_insurance',
        visibleWhen: ({form}) => isPackageTypePackage(form) && hasShipmentOption(form, 'insurance'),

        onBeforeMount: (field: ElementInstance) => {
          setFieldProp(field, PROP_OPTIONS, getFormattedInsurancePossibilities(field, formatter));
        },
      }),
    ],
  });
};
