import {type Component, computed, type WritableComputedRef} from 'vue';
import {get} from '@vueuse/core';
import {type ComponentOrHtmlElement, type InteractiveElementInstance, useForm} from '@myparcel/vue-form-builder';
import {createFormElement} from '../utils';
import {type ElementInstance, type PdkElementEmits, type PdkElementProps, type TriStateValue} from '../types';

type UseTriStateInputContext = (
  props: PdkElementProps<TriStateValue>,
  emit: PdkElementEmits<TriStateValue>,
) => {
  inheritValueElement: ElementInstance<
    PdkElementProps<ComponentOrHtmlElement>,
    ComponentOrHtmlElement,
    string,
    TriStateValue
  >;
  inheritValueModel: WritableComputedRef<boolean>;
  toggleModel: WritableComputedRef<boolean>;
};

const TRI_STATE_VALUE_DEFAULT = -1;

/**
 * A tri-state input can hold a value of 0, 1 or -1. -1 is used to indicate that the value should be inherited or defaulted.
 */
export const useTriStateInputContext: UseTriStateInputContext = (props, emit) => {
  const inheritValueElement = createFormElement<boolean>({
    label: 'settings_use_default_value',
  });

  const model = computed<TriStateValue>({
    set(value) {
      emit('update:modelValue', value);
    },
    get() {
      return props.modelValue;
    },
  });

  const toggleModel = computed<boolean>({
    set(value) {
      model.value = value ? 1 : 0;
    },
    get() {
      return get(props.element.ref) === 1;
    },
  });

  const form = useForm();

  const inheritValueModel = computed<boolean>({
    set(value) {
      const toggle = form.getField<InteractiveElementInstance<Component, string, boolean>>(props.element.name);

      model.value = value ? TRI_STATE_VALUE_DEFAULT : (Number(toggleModel.value) as 0 | 1);

      toggle.setReadOnly(value);
    },

    get() {
      return get(props.element.ref) === TRI_STATE_VALUE_DEFAULT;
    },
  });

  return {
    inheritValueElement,
    inheritValueModel,
    toggleModel,
  };
};
