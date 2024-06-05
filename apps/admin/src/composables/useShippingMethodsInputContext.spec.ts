import {defineComponent, h} from 'vue';
import {beforeEach, describe, expect, it} from 'vitest';
import {mount} from '@vue/test-utils';
import {type ShippingMethodTypeMap, TriState} from '@myparcel-pdk/common';
import {PackageTypeName} from '@myparcel/constants';
import {createFormElement} from '../utils';
import {type ShippingMethodsInputProps} from '../types';
import {doComponentTestSetup} from '../__tests__';
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

interface TestInput {
  input: ShippingMethodTypeMap;
  output: ShippingMethodTypeMap;
}

describe('useShippingMethodsInputContext', () => {
  beforeEach(() => {
    doComponentTestSetup();
  });

  it.each([
    {
      input: {
        [TriState.Off]: [],
        [TriState.Inherit]: [FLAT_RATE_3],
        [PackageTypeName.Package]: [],
        [PackageTypeName.PackageSmall]: [],
        [PackageTypeName.Mailbox]: [FLAT_RATE_1],
        [PackageTypeName.DigitalStamp]: [FLAT_RATE_2],
        [PackageTypeName.Letter]: [],
      },
      output: {
        // off is always empty
        [TriState.Off]: [],
        [TriState.Inherit]: [FLAT_RATE_3],
        [PackageTypeName.Package]: [],
        [PackageTypeName.PackageSmall]: [],
        [PackageTypeName.Mailbox]: [FLAT_RATE_1],
        [PackageTypeName.DigitalStamp]: [FLAT_RATE_2],
        [PackageTypeName.Letter]: [],
      },
    },
  ] satisfies TestInput[])('handles input object model', async ({input, output}) => {
    expect.assertions(1);

    const props = {
      modelValue: input,
      element: createFormElement({
        name: 'test',
        props: {
          options: INPUT_OPTIONS,
        },
      }),
    } satisfies ShippingMethodsInputProps;

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

    const wrapper = mount(component, {props});

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.model).toEqual(output);
  });
});
