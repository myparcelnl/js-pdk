import {computed, markRaw, reactive, type Ref, ref, watch, type WritableComputedRef} from 'vue';
import {get, useVModel} from '@vueuse/core';
import {
  type AnyElementConfiguration,
  type ComponentOrHtmlElement,
  defineField,
  useForm,
} from '@myparcel/vue-form-builder';
import {type ElementInstance, type PdkElementEmits, type PdkElementProps, type TriStateValue} from '../types';
import {useLanguage} from '../composables';

type BoolElInstance = ElementInstance<PdkElementProps<ComponentOrHtmlElement>, ComponentOrHtmlElement, string, boolean>;

type UseTriStateInputContext = (
  props: PdkElementProps<TriStateValue>,
  emit: PdkElementEmits<TriStateValue>,
) => {
  inheritElement: BoolElInstance;
  inheritModel: Ref<boolean>;
  model: WritableComputedRef<TriStateValue>;
  toggleElement: BoolElInstance;
  toggleModel: Ref<boolean>;
};

const TRI_STATE_INHERIT = -1;
const TRI_STATE_ON = 1;
const TRI_STATE_OFF = 0;

/**
 * A tri-state input can hold a value of 0, 1 or -1. -1 is used to indicate that the value should be inherited or defaulted.
 */
// eslint-disable-next-line max-lines-per-function
export const useTriStateInputContext: UseTriStateInputContext = (props, emit) => {
  const {translate} = useLanguage();
  const form = useForm();

  const toggleName = `${props.element.name}__toggle`;

  const inheritModel = ref<boolean>(TRI_STATE_INHERIT === props.modelValue);
  const toggleModel = ref<boolean>(TRI_STATE_INHERIT === props.modelValue ? false : Boolean(props.modelValue));

  const model = useVModel(props, undefined, emit) as WritableComputedRef<TriStateValue>;

  const commonFieldProperties = Object.freeze({
    form,
    component: 'input',
    wrapper: false,
    attributes: {
      hidden: true,
    },
  }) satisfies AnyElementConfiguration;

  const inheritElement = reactive(
    defineField({
      ...commonFieldProperties,
      ref: inheritModel,
      name: `${props.element.name}__inherit`,
      label: translate('settings_use_default_value'),
    }) as unknown as BoolElInstance,
  );

  const toggleElement = reactive(
    defineField({
      ...commonFieldProperties,
      name: toggleName,
      ref: toggleModel,
      isReadOnly: markRaw(computed(() => get(inheritModel))),
    }) as unknown as BoolElInstance,
  );

  watch([toggleModel, inheritModel], ([toggle, inherit]) => {
    if (inherit) {
      toggleModel.value = false;
      model.value = TRI_STATE_INHERIT;
      return;
    }

    model.value = toggle ? TRI_STATE_ON : TRI_STATE_OFF;
  });

  return {
    model,
    inheritElement,
    inheritModel,
    toggleElement,
    toggleModel,
  };
};
