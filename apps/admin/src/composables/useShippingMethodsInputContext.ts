import {computed, type ComputedRef, onUnmounted, reactive, toRaw, useModel, watch} from 'vue';
import {PackageTypeName} from '@myparcel/constants';
import {createFormElement, createObjectWithKeys} from '../utils';
import {type ShippingMethodsInputModelValue, type ShippingMethodsInputProps} from '../types';
import {AdminComponent} from '../data';
import {type ElementOptionsContext, useElementOptions} from './useElementOptions';
import {useLanguage} from './language';

export enum ShippingMethodOption {
  None = 'none',
  Auto = 'auto',
}

type ShippingMethodType = ShippingMethodOption | PackageTypeName;

type ValuesObj = Record<ShippingMethodType, string[]>;

interface ShippingMethodsInputContext<T extends ShippingMethodsInputModelValue> extends ElementOptionsContext<T> {
  elements: Record<string, Record<ShippingMethodType, ReturnType<typeof createFormElement>>>;
  shippingMethodOptions: readonly string[];
  model: ComputedRef<ValuesObj>;
  refs: Record<string, Record<ShippingMethodType, any>>;
}

const SHIPPING_METHOD_OPTIONS = Object.freeze([
  ShippingMethodOption.None,
  ShippingMethodOption.Auto,
  PackageTypeName.Package,
  PackageTypeName.PackageSmall,
  PackageTypeName.Mailbox,
  PackageTypeName.DigitalStamp,
]);

export const useShippingMethodsInputContext = <T extends ShippingMethodsInputModelValue>(
  props: ShippingMethodsInputProps<T>,
  emit?: (name: 'update:modelValue', ...args: unknown[]) => void,
): ShippingMethodsInputContext<T> => {
  const {options: shippingMethods} = useElementOptions<T>(props);
  // TODO: currently flat_rate:3 is not showing up

  const {translate} = useLanguage();

  console.log(shippingMethods.value);

  // const {options, id, model} = useSelectInputContext(props, emit);
  const model = useModel(props, 'modelValue', {
    get(value) {
      const resolvedValue: ValuesObj = Array.isArray(value)
        ? {...createObjectWithKeys(SHIPPING_METHOD_OPTIONS, () => []), [PackageTypeName.Package]: toRaw(value)}
        : value;

      return resolvedValue;
    },
  });

  const refs = reactive(
    shippingMethods.value.reduce((acc, shippingMethod) => {
      const shippingMethodId = shippingMethod.value.toString();
      const current = Object.entries(model.value).find(([, value]) => value.includes(shippingMethodId));

      return {
        ...acc,
        [shippingMethodId]: current?.[0] ?? ShippingMethodOption.None,
      };
    }, {}),
  );

  const elements = computed(() => {
    return shippingMethods.value.reduce((acc, shippingMethod) => {
      const shippingMethodId = shippingMethod.value.toString();

      return {
        ...acc,
        [shippingMethodId]: SHIPPING_METHOD_OPTIONS.reduce((acc, option) => {
          const fieldName = `${props.element.name}__${shippingMethodId}`;
          const {component: _, ...restElement} = props.element;

          return {
            ...acc,
            [option]: toRaw(
              createFormElement({
                ...restElement,
                ref: refs[option],
                name: fieldName,
                label: '', // remove label
                attributes: {
                  title: translate(shippingMethod.label),
                },
                component: AdminComponent.RadioInput,
                props: {
                  value: option,
                },
              }),
            ),
          };
        }, {}),
      };
    }, {} satisfies Record<string, Record<ShippingMethodOption, ReturnType<typeof createFormElement>>>);
  });

  onUnmounted(
    watch(
      refs,
      () => {
        model.value = Object.entries(refs).reduce(
          (acc, [key, value]) => {
            if (!acc[value]) {
              acc[value] = [];
            }

            acc[value].push(key);

            return acc;
          },
          createObjectWithKeys(SHIPPING_METHOD_OPTIONS, () => []),
        );
      },
      {deep: true, immediate: true},
    ),
  );

  return {
    refs,
    model,
    elements,
    options: shippingMethods,
    shippingMethodOptions: SHIPPING_METHOD_OPTIONS,
  };
};
