/* eslint-disable @typescript-eslint/no-magic-numbers */
// noinspection JSUnusedGlobalSymbols

import {markRaw, ref} from 'vue';
import {get} from '@vueuse/core';
import {AdminComponent, type Plugin} from '@myparcel-pdk/common';
import {defineForm} from '@myparcel/vue-form-builder';
import {type OneOrMore, type PromiseOr, toArray} from '@myparcel/ts-utils';
import {PackageTypeName} from '@myparcel/constants';
import {defineFormField, resolveFormComponent, setFieldProp} from '../helpers';
import {createShipmentFormName} from '../../utils';
import {AdminContextKey, AdminModalKey, type ElementInstance, type RadioGroupOption} from '../../types';
import {useModalStore} from '../../stores';
import {useCarrier} from '../../sdk';
import {useAdminConfig, useAssetUrl, useContext, useLanguage, useLocalizedFormatter} from '../../composables';
import {
  addBulkEditNotification,
  createHasShipmentOptionWatcher,
  getFormattedInsurancePossibilities,
  getPackageTypes,
} from './helpers';
import {
  AGE_CHECK,
  DIRECT_RETURN,
  FIELD_AGE_CHECK,
  FIELD_CARRIER,
  FIELD_DIRECT_RETURN,
  FIELD_INSURANCE,
  FIELD_LABEL_AMOUNT,
  FIELD_LARGE_FORMAT,
  FIELD_ONLY_RECIPIENT,
  FIELD_PACKAGE_TYPE,
  FIELD_SAME_DAY_DELIVERY,
  FIELD_SIGNATURE,
  INSURANCE,
  LARGE_FORMAT,
  ONLY_RECIPIENT,
  PROP_OPTIONS,
  SAME_DAY_DELIVERY,
  SIGNATURE,
} from './field';

const SHIPMENT_OPTIONS_LABEL_PREFIX = 'shipment_options_';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,max-lines-per-function,complexity
export const createShipmentOptionsForm = (orders?: OneOrMore<Plugin.ModelPdkOrder>) => {
  const ordersArray = toArray(orders ?? []);
  ordersArray.forEach((order) => markRaw(order));

  const dynamicContext = useContext(AdminContextKey.Dynamic);

  const config = useAdminConfig();
  const modalStore = useModalStore();
  const formatter = useLocalizedFormatter();

  const {translate} = useLanguage();

  const isBulk = ordersArray.length > 1;
  const isModal = AdminModalKey.ShipmentOptions === modalStore.opened;

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
        name: FIELD_CARRIER,
        label: 'carrier',
        ref: ref<string>(values.deliveryOptions?.carrier?.externalIdentifier as string),
        component: resolveFormComponent(AdminComponent.RadioGroup),
        props: {
          options: [],
        },

        // @ts-expect-error todo
        onBeforeMount: async (field) => {
          const carrierSelectOptions = await Promise.all(
            dynamicContext.carriers.map(async (carrier): Promise<RadioGroupOption> => {
              const query = useCarrier(carrier.name);
              await query.suspense();

              const apiCarrier = get(query.data);

              let plainLabel = apiCarrier?.human ?? carrier.human ?? '';

              if (!carrier.isDefault) {
                plainLabel += ` ${carrier.label ?? translate(`carrier_type_${carrier.type}`)}`;
              }

              return {
                plainLabel,
                value: carrier.externalIdentifier ?? apiCarrier?.name ?? '',
                image: apiCarrier?.meta.logo_svg ? useAssetUrl(apiCarrier.meta.logo_svg) : undefined,
              };
            }),
          );

          setFieldProp(field, PROP_OPTIONS, carrierSelectOptions);

          field.afterUpdate(field);
        },

        afterUpdate: (field) => {
          setFieldProp(field.form, FIELD_INSURANCE, PROP_OPTIONS, getFormattedInsurancePossibilities(field, formatter));
          setFieldProp(field.form, FIELD_PACKAGE_TYPE, PROP_OPTIONS, getPackageTypes(field.form));
        },
      }),

      defineFormField({
        name: FIELD_LABEL_AMOUNT,
        label: 'label_amount',
        ref: ref(values.deliveryOptions?.labelAmount ?? 1),
        component: resolveFormComponent(AdminComponent.NumberInput),
        props: {
          min: 1,
          max: 10,
        },
      }),

      defineFormField({
        name: FIELD_PACKAGE_TYPE,
        label: `${SHIPMENT_OPTIONS_LABEL_PREFIX}package_type`,
        ref: ref<PackageTypeName>((values.deliveryOptions?.packageType as PackageTypeName) ?? PackageTypeName.Package),
        component: resolveFormComponent(AdminComponent.RadioGroup),
      }),

      defineFormField({
        name: FIELD_SIGNATURE,
        label: `${SHIPMENT_OPTIONS_LABEL_PREFIX}signature`,
        ref: ref(values.deliveryOptions?.shipmentOptions.signature ?? false),
        component: resolveFormComponent(AdminComponent.ToggleInput),
        visibleWhen: createHasShipmentOptionWatcher(SIGNATURE),
        disabledWhen: createHasShipmentOptionWatcher(SIGNATURE, true),
        readOnlyWhen: ({form}) => form.getValue(FIELD_AGE_CHECK),
      }),

      defineFormField({
        name: FIELD_ONLY_RECIPIENT,
        label: `${SHIPMENT_OPTIONS_LABEL_PREFIX}only_recipient`,
        ref: ref(values.deliveryOptions?.shipmentOptions.onlyRecipient ?? false),
        component: resolveFormComponent(AdminComponent.ToggleInput),
        visibleWhen: createHasShipmentOptionWatcher(ONLY_RECIPIENT),
        disabledWhen: createHasShipmentOptionWatcher(ONLY_RECIPIENT, true),
        readOnlyWhen: ({form}) => form.getValue(FIELD_AGE_CHECK),
      }),

      defineFormField({
        name: FIELD_AGE_CHECK,
        component: resolveFormComponent(AdminComponent.ToggleInput),
        ref: ref(values.deliveryOptions?.shipmentOptions.ageCheck ?? false),
        label: `${SHIPMENT_OPTIONS_LABEL_PREFIX}age_check`,
        visibleWhen: createHasShipmentOptionWatcher(AGE_CHECK),
        disabledWhen: createHasShipmentOptionWatcher(AGE_CHECK, true),
        afterUpdate({form}, value): PromiseOr<void> {
          if (!value) {
            return;
          }

          form.setValue(FIELD_SIGNATURE, true);
          form.setValue(FIELD_ONLY_RECIPIENT, true);
        },
      }),

      defineFormField({
        name: FIELD_DIRECT_RETURN,
        component: resolveFormComponent(AdminComponent.ToggleInput),
        ref: ref(values.deliveryOptions?.shipmentOptions.return ?? false),
        label: `${SHIPMENT_OPTIONS_LABEL_PREFIX}return`,
        visibleWhen: createHasShipmentOptionWatcher(DIRECT_RETURN),
        disabledWhen: createHasShipmentOptionWatcher(DIRECT_RETURN, true),
      }),

      defineFormField({
        name: FIELD_LARGE_FORMAT,
        component: resolveFormComponent(AdminComponent.ToggleInput),
        ref: ref(values.deliveryOptions?.shipmentOptions.largeFormat ?? false),
        label: `${SHIPMENT_OPTIONS_LABEL_PREFIX}large_format`,
        visibleWhen: createHasShipmentOptionWatcher(LARGE_FORMAT),
        disabledWhen: createHasShipmentOptionWatcher(LARGE_FORMAT, true),
      }),

      defineFormField({
        name: FIELD_SAME_DAY_DELIVERY,
        component: resolveFormComponent(AdminComponent.ToggleInput),
        ref: ref(values.deliveryOptions?.shipmentOptions.sameDayDelivery ?? false),
        label: `${SHIPMENT_OPTIONS_LABEL_PREFIX}same_day_delivery`,
        visibleWhen: createHasShipmentOptionWatcher(SAME_DAY_DELIVERY),
        disabledWhen: createHasShipmentOptionWatcher(SAME_DAY_DELIVERY, true),
      }),

      defineFormField({
        name: FIELD_INSURANCE,
        component: resolveFormComponent(AdminComponent.SelectInput),
        ref: ref(values.deliveryOptions?.shipmentOptions.insurance ?? 0),
        label: `${SHIPMENT_OPTIONS_LABEL_PREFIX}insurance`,
        visibleWhen: createHasShipmentOptionWatcher(INSURANCE),
        disabledWhen: createHasShipmentOptionWatcher(INSURANCE, true),

        onBeforeMount: (field: ElementInstance) => {
          setFieldProp(field, PROP_OPTIONS, getFormattedInsurancePossibilities(field, formatter));
        },
      }),
    ],
  });
};
