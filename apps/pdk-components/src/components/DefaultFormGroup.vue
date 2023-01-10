<template>
  <PdkRow>
    <PdkCol>
      <label :for="id">
        <!-- Can be used instead of the label prop. -->
        <slot name="label">
          {{ translate(element.label) }}
          <span
            v-if="element.isOptional"
            v-text="translate('form_optional_tip')" />
        </slot>
      </label>

      <small v-if="element.props?.description">
        {{ translate(element.props?.description) }}
      </small>
    </PdkCol>

    <PdkCol>
      <slot />

      <div v-if="!element.isValid">
        <ul>
          <li
            v-for="(error, index) in element.errors"
            :key="`error_${index}`">
            {{ error }}
          </li>
        </ul>
      </div>
    </PdkCol>
  </PdkRow>
</template>

<script lang="ts">
import {PropType, UnwrapNestedRefs, defineComponent} from 'vue';
import {InteractiveElementInstance} from '@myparcel/vue-form-builder';
import {generateFieldId} from '@myparcel-pdk/frontend-core/src/utils/generateFieldId';
import {useTranslate} from '@myparcel/pdk-frontend';

/**
 * A form group is used to render a label and a form element.
 */
export default defineComponent({
  name: 'DefaultFormGroup',
  inheritAttrs: false,
  props: {
    element: {
      type: Object as PropType<UnwrapNestedRefs<InteractiveElementInstance>>,
      required: true,
    },
  },

  setup: (props) => ({
    id: generateFieldId(props.element),
    translate: useTranslate(),
  }),
});
</script>
