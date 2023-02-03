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
import {ElementInstance, generateFieldId, useLanguage} from '@myparcel-pdk/frontend-core';
import {PropType, defineComponent} from 'vue';

/**
 * A form group is used to render a label and a form element.
 */
export default defineComponent({
  name: 'DefaultFormGroup',
  props: {
    element: {
      type: Object as PropType<ElementInstance>,
      required: true,
    },
  },

  setup: (props) => {
    const {translate} = useLanguage();

    return {
      id: generateFieldId(props.element),
      translate,
    };
  },
});
</script>
