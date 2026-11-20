import {defineComponent, h} from 'vue';
import {beforeEach, describe, expect, it} from 'vitest';
import {mount} from '@vue/test-utils';
import {createFormElement} from '../../utils';
import {doComponentTestSetup} from '../../__tests__';
import {useInputWithOptionsContext} from './useInputWithOptionsContext';

const OPTIONS = Object.freeze([
  {plainLabel: 'First', value: 'first'},
  {plainLabel: 'Second', value: 'second'},
]);

const mountWithProps = (elementProps: Record<string, unknown>) => {
  const component = defineComponent({
    props: {
      modelValue: {type: String, default: undefined},
      element: {type: Object, required: true},
    },
    emits: ['update:modelValue'],
    render: () => h('div'),
    // @ts-expect-error the test element is not fully typed
    setup: (props, ctx) => useInputWithOptionsContext(props, ctx.emit),
  });

  return mount(component, {
    props: {
      element: createFormElement({name: 'test', props: {options: OPTIONS, ...elementProps}}),
    },
  });
};

describe('useInputWithOptionsContext', () => {
  beforeEach(() => {
    doComponentTestSetup();
  });

  it('selects the first option when there is no value', async () => {
    const wrapper = mountWithProps({});

    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('update:modelValue')).toEqual([['first']]);
  });

  it('selects nothing when the field opts out', async () => {
    const wrapper = mountWithProps({autoSelectFirstOption: false});

    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
  });
});
