import {defineComponent, h, ref} from 'vue';
import {afterEach, describe, expect, it} from 'vitest';
import {flushPromises, mount} from '@vue/test-utils';
import {defineForm, MagicForm, useFormBuilder} from '@myparcel-dev/vue-form-builder';
import {TriState} from '@myparcel-dev/pdk-common';
import {buildAfterUpdate} from '../form-builder';
import {withTriStateModel} from './withTriStateModel';

/**
 * Stand-in for a plugin toggle component: a native checkbox with a boolean
 * v-model, like the WooCommerce and PrestaShop toggle inputs. Emits booleans,
 * not tri-state ints.
 */
const BooleanToggleStub = defineComponent({
  name: 'BooleanToggleStub',
  props: {
    // eslint-disable-next-line vue/require-prop-types
    modelValue: {type: null, default: undefined},
  },
  emits: ['update:modelValue'],
  setup(props, {emit, slots}) {
    return () =>
      h('label', [
        h('input', {
          type: 'checkbox',
          checked: Boolean(props.modelValue),
          onChange: (event: Event) => emit('update:modelValue', (event.target as HTMLInputElement).checked),
        }),
        slots.default?.(),
      ]);
  },
});

describe('withTriStateModel', () => {
  it('converts a boolean true emit to tri-state on', async () => {
    const wrapper = mount(withTriStateModel(BooleanToggleStub), {props: {modelValue: TriState.Off}});

    await wrapper.find('input').setValue(true);

    expect(wrapper.emitted('update:modelValue')).toEqual([[TriState.On]]);
  });

  it('converts a boolean false emit to tri-state off', () => {
    const wrapper = mount(withTriStateModel(BooleanToggleStub), {props: {modelValue: TriState.On}});

    wrapper.findComponent(BooleanToggleStub).vm.$emit('update:modelValue', false);

    expect(wrapper.emitted('update:modelValue')).toEqual([[TriState.Off]]);
  });

  it('passes tri-state int emits through unchanged', () => {
    const wrapper = mount(withTriStateModel(BooleanToggleStub), {props: {modelValue: TriState.Off}});
    const inner = wrapper.findComponent(BooleanToggleStub);

    inner.vm.$emit('update:modelValue', TriState.Inherit);
    inner.vm.$emit('update:modelValue', TriState.On);
    inner.vm.$emit('update:modelValue', TriState.Off);

    expect(wrapper.emitted('update:modelValue')).toEqual([[TriState.Inherit], [TriState.On], [TriState.Off]]);
  });

  it('forwards modelValue to the inner component unchanged', () => {
    const wrapper = mount(withTriStateModel(BooleanToggleStub), {props: {modelValue: TriState.On}});

    expect(wrapper.findComponent(BooleanToggleStub).props('modelValue')).toBe(TriState.On);
    expect(wrapper.find('input').element.checked).toBe(true);
  });

  it('emits exactly once per inner emit', async () => {
    const wrapper = mount(withTriStateModel(BooleanToggleStub), {props: {modelValue: TriState.Off}});

    await wrapper.find('input').setValue(true);

    expect(wrapper.emitted('update:modelValue')).toHaveLength(1);
  });

  it('forwards attributes and slots to the inner component', () => {
    const wrapper = mount(withTriStateModel(BooleanToggleStub), {
      props: {modelValue: TriState.Off},
      attrs: {'data-test-id': 'my-toggle'},
      slots: {default: () => 'toggle label'},
    });
    const inner = wrapper.findComponent(BooleanToggleStub);

    expect(inner.attributes('data-test-id')).toBe('my-toggle');
    expect(inner.text()).toBe('toggle label');
  });
});

describe('withTriStateModel in a form', () => {
  afterEach(() => {
    useFormBuilder().forms.value = {};
  });

  it('makes strict $eq afterUpdate rules fire on toggle interaction', async () => {
    expect.assertions(2);

    const form = defineForm('test', {
      fields: [
        {
          name: 'exportAgeCheck',
          component: withTriStateModel(BooleanToggleStub),
          ref: ref(TriState.Off),
          afterUpdate: buildAfterUpdate(
            [{$setValue: {$value: TriState.On, $target: 'exportSignature', $if: [{$eq: TriState.On}]}}],
            '',
          ),
        },
        {
          name: 'exportSignature',
          component: 'input',
          ref: ref(TriState.Off),
        },
      ],
    });

    const wrapper = mount(MagicForm, {props: {form}});
    await flushPromises();

    await wrapper.find('input[type=checkbox]').setValue(true);
    await flushPromises();

    expect(form.values.exportAgeCheck).toBe(TriState.On);
    expect(form.values.exportSignature).toBe(TriState.On);
  });

  it('does not fire negated conditions spuriously while toggling on', async () => {
    expect.assertions(1);

    const form = defineForm('test', {
      fields: [
        {
          name: 'exportAgeCheck',
          component: withTriStateModel(BooleanToggleStub),
          ref: ref(TriState.Off),
          afterUpdate: buildAfterUpdate(
            [{$setValue: {$value: TriState.On, $target: 'exportSignature', $if: [{$ne: TriState.On}]}}],
            '',
          ),
        },
        {
          name: 'exportSignature',
          component: 'input',
          ref: ref(TriState.Off),
        },
      ],
    });

    const wrapper = mount(MagicForm, {props: {form}});
    await flushPromises();

    await wrapper.find('input[type=checkbox]').setValue(true);
    await flushPromises();

    expect(form.values.exportSignature).toBe(TriState.Off);
  });
});
