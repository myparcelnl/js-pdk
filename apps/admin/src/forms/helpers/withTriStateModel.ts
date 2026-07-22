import {type Component, defineComponent, h} from 'vue';
import {type AnyVal} from '../form-builder/types';
import {booleanToTriState} from '../../utils';

/**
 * Wraps a form component so its v-model always carries tri-state ints in form
 * state. Plugin toggle components are native checkboxes that emit booleans;
 * this adapter converts those emits at the component boundary, so strict $eq
 * conditions, afterUpdate operations, submitted values and stored settings all
 * see the same canonical tri-state representation. Int emits (including
 * Inherit) pass through untouched; the value passed down is never converted.
 */
export const withTriStateModel = (component: Component | string): Component =>
  defineComponent({
    name: 'WithTriStateModel',
    inheritAttrs: false,
    props: {
      // eslint-disable-next-line vue/require-prop-types
      modelValue: {type: null, default: undefined},
    },
    emits: ['update:modelValue'],
    setup(props, {attrs, emit, slots}) {
      return () =>
        h(
          component as Component,
          {
            ...attrs,
            modelValue: props.modelValue,
            'onUpdate:modelValue': (value: AnyVal) =>
              emit('update:modelValue', typeof value === 'boolean' ? booleanToTriState(value) : value),
          },
          slots,
        );
    },
  });
