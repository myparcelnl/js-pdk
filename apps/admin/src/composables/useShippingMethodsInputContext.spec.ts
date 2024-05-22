import {defineComponent, h} from 'vue';
import {describe, expect, it} from 'vitest';
import {mount} from '@vue/test-utils';
import {PackageTypeName} from '@myparcel/constants';
import {createFormElement} from '../utils';
import {type ShippingMethodsInputModelValue, type ShippingMethodsInputProps} from '../types';
import {useShippingMethodsInputContext} from './useShippingMethodsInputContext';

const FLAT_RATE_1 = 'flat_rate:1';
const FLAT_RATE_2 = 'flat_rate:2';
const FLAT_RATE_3 = 'flat_rate:3';
const FLAT_RATE_4 = 'flat_rate:4';
const FREE_SHIPPING = 'free_shipping';

const INPUT_OPTIONS = Object.freeze([
  {label: 'Flat rate', value: FLAT_RATE_1},
  {label: 'Flat rate 2', value: FLAT_RATE_2},
  {label: 'Flat rate 3', value: FLAT_RATE_3},
  {label: 'Flat rate 4', value: FLAT_RATE_4},
  {label: 'Free shipping', value: FREE_SHIPPING},
]);

const createWrapper = <T extends ShippingMethodsInputModelValue>(modelValue: T) => {
  const props = {
    modelValue,
    element: createFormElement({
      name: 'test',
      props: {
        options: INPUT_OPTIONS,
      },
    }),
  } satisfies ShippingMethodsInputProps<T>;

  const component = defineComponent({
    props: {
      modelValue: {
        type: [Array, Object],
      },
      element: {
        type: Object,
      },
    },
    render() {
      return h('div');
    },
    setup(props, ctx) {
      return useShippingMethodsInputContext(props, ctx.emit);
    },
  });

  return mount(component, {props});
};

describe('useShippingMethodsInputContext', () => {
  it('converts plain array to object model', () => {
    const wrapper = createWrapper([FLAT_RATE_1, FLAT_RATE_2]);

    expect(wrapper.vm.model).toEqual({
      none: [FLAT_RATE_3, FLAT_RATE_4],
      auto: [],
      [PackageTypeName.Package]: [FLAT_RATE_1, FLAT_RATE_2],
      [PackageTypeName.PackageSmall]: [],
      [PackageTypeName.Mailbox]: [],
      [PackageTypeName.DigitalStamp]: [],
    });
  });

  it('handles input object model', () => {
    const wrapper = createWrapper({
      none: [],
      auto: [FLAT_RATE_3],
      [PackageTypeName.Package]: [],
      [PackageTypeName.PackageSmall]: [],
      [PackageTypeName.Mailbox]: [FLAT_RATE_1],
      [PackageTypeName.DigitalStamp]: [FLAT_RATE_2],
    });

    expect(wrapper.vm.model).toEqual({
      none: [FLAT_RATE_4],
      auto: [FLAT_RATE_3],
      [PackageTypeName.Package]: [],
      [PackageTypeName.PackageSmall]: [],
      [PackageTypeName.Mailbox]: [FLAT_RATE_1],
      [PackageTypeName.DigitalStamp]: [FLAT_RATE_2],
    });
  });
});
