<template>
  <PdkRow>
    <PdkCol>
      <label :for="id">
        <!-- Can be used instead of the label prop. -->
        <slot name="label">
          {{ translate(label) }}
          <span
            v-if="optional"
            v-text="translate('form_optional_tip')" />
        </slot>
      </label>

      <small v-if="description">
        {{ translate(description) }}
      </small>
    </PdkCol>

    <PdkCol>
      <component
        :is="component"
        :id="id"
        v-bind="{...$attrs, ...$props}" />

      <div v-if="!valid">
        <ul>
          <li
            v-for="(error, index) in errors"
            :key="`error_${index}`">
            {{ error }}
          </li>
        </ul>
      </div>
    </PdkCol>
  </PdkRow>
</template>

<script lang="ts">
import {PropType, defineComponent} from 'vue';
import {generateId, useTranslate} from '@myparcel-pdk/frontend-core';
import {PdkComponentName} from '@myparcel-pdk/common';

/**
 * A form group is used to render a label and a form element.
 */
export default defineComponent({
  name: 'DefaultFormGroup',
  inheritAttrs: false,
  props: {
    /**
     * Component to render as the form group's control.
     */
    component: {
      type: String as PropType<PdkComponentName>,
      default: null,
    },

    /**
     * Description to explain what this form group is for.
     */
    description: {
      type: String,
      default: null,
    },

    /**
     * Errors to display.
     */
    errors: {
      type: Array as PropType<string[]>,
      default: () => [],
    },

    /**
     * Label of the form group. Can be used instead of the label slot.
     */
    label: {
      type: String,
      default: null,
    },

    /**
     * Whether the form group is optional.
     */
    optional: {
      type: Boolean,
    },

    /**
     * Suspended form groups are disabled and cannot be interacted with.
     */
    // eslint-disable-next-line vue/no-unused-properties
    suspended: {
      type: Boolean,
    },

    /**
     * Whether the form group is valid.
     */
    valid: {
      type: Boolean,
    },
  },

  setup: () => ({
    translate: useTranslate(),
    id: `fg${generateId()}`,
  }),
});
</script>
