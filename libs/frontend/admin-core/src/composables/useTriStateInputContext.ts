import {type Component, computed, type WritableComputedRef} from 'vue';
import {get, watchOnce} from '@vueuse/core';
import {type ComponentOrHtmlElement, type InteractiveElementInstance, useForm} from '@myparcel/vue-form-builder';
import {createFormElement} from '../utils';
import {type ElementInstance, type PdkElementEmits, type PdkElementProps, type TriStateValue} from '../types';
import {useLanguage} from '../composables';

type UseTriStateInputContext = (
  props: PdkElementProps<TriStateValue>,
  emit: PdkElementEmits<TriStateValue>,
) => {
  inheritValueElement: ElementInstance<
    PdkElementProps<ComponentOrHtmlElement>,
    ComponentOrHtmlElement,
    string,
    boolean
  >;
  inheritValueModel: WritableComputedRef<boolean>;
  model: WritableComputedRef<TriStateValue>;
  toggleElement: ElementInstance<PdkElementProps<ComponentOrHtmlElement>, ComponentOrHtmlElement, string, boolean>;
  toggleModel: WritableComputedRef<boolean>;
};

const TRI_STATE_VALUE_DEFAULT = -1;

/**
 * A tri-state input can hold a value of 0, 1 or -1. -1 is used to indicate that the value should be inherited or defaulted.
 */
// eslint-disable-next-line max-lines-per-function
export const useTriStateInputContext: UseTriStateInputContext = (props, emit) => {
  const {translate} = useLanguage();
  const form = useForm();

  const toggleName = `${props.element.name}__toggle`;

  const setToggleReadOnly = (value: boolean): void => {
    const toggle = form.getField<InteractiveElementInstance<Component, string, boolean>>(toggleName);

    toggle.setReadOnly(value);
  };

  const model = computed<TriStateValue>({
    set: (value) => emit('update:modelValue', value),
    get: () => props.modelValue,
  });

  const toggleModel = computed<boolean>({
    set: (value) => {
      model.value = value ? 1 : 0;
    },
    get: () => get(props.element.ref) === 1,
  });

  const toggleElement = createFormElement<boolean>({name: toggleName});

  const inheritValueModel = computed<boolean>({
    set: (value) => {
      model.value = value ? TRI_STATE_VALUE_DEFAULT : (Number(toggleModel.value) as 0 | 1);

      setToggleReadOnly(value);
    },
    get: () => get(props.element.ref) === TRI_STATE_VALUE_DEFAULT,
  });

  const inheritValueElement = createFormElement<boolean>({
    name: undefined,
    label: translate('settings_use_default_value'),
  });

  watchOnce(form.stable, () => {
    setToggleReadOnly(get(inheritValueModel));
  });

  return {
    inheritValueElement,
    inheritValueModel,
    model,
    toggleElement,
    toggleModel,
  };
};
