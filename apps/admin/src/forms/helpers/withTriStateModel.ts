import {type Component, defineComponent, h} from 'vue';
import {type AnyVal} from '../form-builder/types';
import {booleanToTriState} from '../../utils';

/**
 * Wraps a form component so its v-model always carries tri-state ints (1/0/-1)
 * in form state. Plugin toggle components are native checkboxes that emit
 * booleans; this wrapper converts those emits right where the component hands
 * its value to the form, so strict $eq conditions, afterUpdate operations,
 * submitted values and stored settings all see the same tri-state ints. Int
 * emits (including Inherit) pass through untouched; the value passed down into
 * the component is never converted.
 *
 * @param component - The component to wrap: the resolved (registered) plugin component, or a
 *   component name string when resolution happens at render time.
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
