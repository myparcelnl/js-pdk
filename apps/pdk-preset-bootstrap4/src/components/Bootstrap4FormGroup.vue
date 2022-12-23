<template>
  <div class="form-group row">
    <label
      class="col-sm-4 form-control-label"
      :for="id"
      :class="{
        required: !optional,
      }">
      <slot name="label">
        {{ translate(label) }}
      </slot>
    </label>

    <div class="col-sm-8">
      <component
        :is="component"
        :id="id"
        class="form-control"
        :class="{
          'is-invalid': !valid,
        }"
        v-bind="{...$attrs, ...$props}"
        :aria-describedby="description ? helpId : null" />
      <small
        v-if="description"
        :id="helpId"
        class="form-text text-muted">
        {{ translate(description) }}
      </small>

      <div
        v-if="!valid"
        class="invalid-feedback">
        <ul class="list-unstyled">
          <li
            v-for="(error, index) in errors"
            :key="`error_${index}`">
            {{ error }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {PdkComponentName, generateId, useTranslate} from '@myparcel-pdk/frontend-core';
import {PropType, defineComponent} from 'vue';

/**
 * @see import('@myparcel/pdk-components').DefaultFormGroup
 */
export default defineComponent({
  name: 'Bootstrap4FormGroup',
  inheritAttrs: false,
  props: {
    component: {
      type: String as PropType<PdkComponentName>,
      default: null,
    },

    description: {
      type: String,
      default: null,
    },

    errors: {
      type: Array as PropType<string[]>,
      default: () => [],
    },

    label: {
      type: String,
      default: null,
    },

    optional: {
      type: Boolean,
    },

    // eslint-disable-next-line vue/no-unused-properties
    suspended: {
      type: Boolean,
    },

    valid: {
      type: Boolean,
    },
  },

  setup: () => {
    return {
      id: `fg${generateId()}`,
      helpId: `fgHelp${generateId()}`,
      translate: useTranslate(),
    };
  },
});
</script>
