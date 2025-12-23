import {computed, markRaw, reactive, ref, type Ref, toValue, watch, type WritableComputedRef} from 'vue';
import {TriState} from '@myparcel-dev/pdk-common';
import {type FieldConfiguration, defineField, useForm} from '@myparcel-dev/vue-form-builder';
import {useLanguage} from '../language';
import {booleanToTriState, triStateToBoolean} from '../../utils';
import {
  type ElementInstance,
  type PdkElementProps,
  type TriStateInputEmits,
  type TriStateInputModelValue,
  type TriStateInputProps,
} from '../../types';
import {useElementContext} from './useElementContext';

type BoolElInstance = ElementInstance<boolean, PdkElementProps>;

interface TriStateInputContext {
  id: string;
  inheritElement: BoolElInstance;
  inheritModel: Ref<boolean>;
  model: WritableComputedRef<TriStateInputModelValue>;
  toggleElement: BoolElInstance;
  toggleModel: Ref<boolean>;
}

type UseTriStateInputContext = (props: TriStateInputProps, emit: TriStateInputEmits) => TriStateInputContext;

/**
 * A tri-state input can hold a value of 0, 1 or -1. -1 is used to indicate that the value should be inherited .
 */
// eslint-disable-next-line max-lines-per-function
export const useTriStateInputContext: UseTriStateInputContext = (props, emit) => {
  const {translate} = useLanguage();
  const form = useForm();

  const inheritModel = ref<boolean>(TriState.Inherit === toValue(props.modelValue));
  const toggleModel = ref<boolean>(triStateToBoolean(toValue(props.modelValue)));

  const {id, model} = useElementContext<TriStateInputModelValue>(props, emit);

  /**
   * The value when the element is set to inherit.
   */
  const defaultValue = computed(() => {
    return props.element.props.defaultValue ?? TriState.Inherit;
  });

  const commonFieldProperties = Object.freeze({
    component: 'input',
    wrapper: false,
    attributes: {
      hidden: true,
    },
  }) satisfies Partial<FieldConfiguration>;

  const inheritElement = reactive(
    defineField({
      ...commonFieldProperties,
      ref: inheritModel,
      name: `${props.element.name}__inherit`,
      label: translate('settings_use_default_value'),
    }),
  );

  const toggleElement = reactive(
    defineField({
      ...commonFieldProperties,
      name: `${props.element.name}__toggle`,
      ref: toggleModel,
      // The toggle is readonly when inherit is enabled or the element itself is set to readonly.
      isReadOnly: markRaw(computed(() => toValue(inheritModel) || toValue(props.element.isReadOnly))),
    }),
  );

  // When the toggle is changed, the model is updated to 1/0 as long as inherit is disabled.
  watch(toggleModel, (toggle) => {
    if (inheritModel.value) {
      return;
    }

    model.value = booleanToTriState(toggle);
  });

  // When inherit is disabled, the model is updated to the current toggle value
  // When inherit is enabled, the model is updated to -1 and the toggle is updated to the default value.
  watch([inheritModel, defaultValue], ([inherit, defaultValue], [oldInherit, oldDefaultValue]) => {
    if (inherit === oldInherit && defaultValue === oldDefaultValue) {
      return;
    }

    if (!inherit) {
      model.value = booleanToTriState(toggleModel.value);
      return;
    }

    model.value = TriState.Inherit;
    toggleModel.value = triStateToBoolean(defaultValue ?? TriState.Inherit);
  });

  // When the model is changed manually, like from another element, the toggle is updated if inherit is disabled.
  watch(model, (model) => {
    if (inheritModel.value) {
      return;
    }

    toggleModel.value = triStateToBoolean(model);
  });

  return {
    id,
    inheritElement,
    inheritModel,
    model,
    toggleElement,
    toggleModel,
  } as unknown as TriStateInputContext;
};
