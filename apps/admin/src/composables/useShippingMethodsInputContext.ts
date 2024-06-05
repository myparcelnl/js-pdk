import {type ComputedRef, onUnmounted, reactive, type Ref, toRaw, watch} from 'vue';
import {useVModel} from '@vueuse/core';
import {type ShippingMethodId, type ShippingMethodType, TriState} from '@myparcel-pdk/common';
import {PackageTypeName} from '@myparcel/constants';
import {createFormElement, createObjectWithKeys} from '../utils';
import {
  type SelectOptionWithLabel,
  type ShippingMethodsInputModelValue,
  type ShippingMethodsInputProps,
} from '../types';
import {AdminComponent} from '../data';
import {useElementOptions} from './useElementOptions';
import {useLanguage} from './language';

const SHIPPING_METHOD_TYPES = Object.freeze([
  {label: 'option_none', value: TriState.Off},
  {label: 'option_inherit', value: TriState.Inherit},
  {label: PackageTypeName.Package, value: PackageTypeName.Package},
  {label: PackageTypeName.PackageSmall, value: PackageTypeName.PackageSmall},
  {label: PackageTypeName.Mailbox, value: PackageTypeName.Mailbox},
  {label: PackageTypeName.DigitalStamp, value: PackageTypeName.DigitalStamp},
  {label: PackageTypeName.Letter, value: PackageTypeName.Letter},
] satisfies SelectOptionWithLabel<ShippingMethodType>[]);

interface ShippingMethodsInputContext {
  elements: Record<ShippingMethodId, Record<ShippingMethodType, ReturnType<typeof createFormElement>>>;
  model: Ref<ShippingMethodsInputModelValue>;
  refs: Record<ShippingMethodId, ShippingMethodType>;
  shippingMethodTypes: readonly SelectOptionWithLabel<ShippingMethodType>[];
  shippingMethods: ComputedRef<SelectOptionWithLabel<ShippingMethodId>[]>;
}

// eslint-disable-next-line max-lines-per-function
export const useShippingMethodsInputContext = <T extends ShippingMethodsInputModelValue>(
  props: ShippingMethodsInputProps<T>,
  emit?: (name: 'update:modelValue', value: T) => void,
): ShippingMethodsInputContext => {
  const {translate} = useLanguage();

  const {options: shippingMethods} = useElementOptions<string, ShippingMethodsInputProps<T>>(props);
  const model = useVModel(props, 'modelValue', emit);

  const refs = reactive<Record<ShippingMethodId, ShippingMethodType>>(
    shippingMethods.value.reduce((acc, shippingMethod) => {
      const shippingMethodId = shippingMethod.value.toString();
      const current = Object.entries(model.value).find(([, value]) => value.includes(shippingMethodId));

      return {
        ...acc,
        [shippingMethodId]: current?.[0] ?? TriState.Off,
      };
    }, {}),
  );

  const elements = reactive(
    shippingMethods.value.reduce((acc, shippingMethod) => {
      const shippingMethodId = shippingMethod.value.toString();

      return {
        ...acc,
        [shippingMethodId]: SHIPPING_METHOD_TYPES.reduce((acc, option) => {
          const fieldName = `${props.element.name}__${shippingMethodId}`;

          return {
            ...acc,
            [option.value]: toRaw(
              createFormElement({
                component: AdminComponent.RadioInput,
                ref: refs[option.value] as unknown as Ref<boolean>,
                name: fieldName,
                // remove label from individual radio buttons
                label: '',
                props: {
                  value: option.value,
                },
                attributes: {
                  title: shippingMethod.label,
                },
              }),
            ),
          };
        }, {}),
      };
    }, {} satisfies Record<ShippingMethodId, Record<ShippingMethodType, ReturnType<typeof createFormElement>>>),
  );

  /**
   * Update model value with the correct format when refs change
   */
  onUnmounted(
    watch(
      refs,
      () => {
        const keys = SHIPPING_METHOD_TYPES.map(({value}) => value).filter((type) => type !== TriState.Off);

        model.value = Object.entries(refs)
          // Remove off state from model
          .filter(([, value]) => value !== TriState.Off)
          .reduce((acc, [key, value]) => {
            acc[value] ??= [];
            acc[value].push(key);

            return acc;
          }, createObjectWithKeys(keys, () => []) as T);
      },
      {deep: true, immediate: true},
    ),
  );

  return {
    elements,
    model,
    refs,
    shippingMethodTypes: SHIPPING_METHOD_TYPES,
    shippingMethods,
  };
};
