<template>
  <div class="form-group row">
    <label
      class="col-sm-4 form-control-label"
      :for="id"
      :class="{
        required: !element.isOptional,
      }">
      <slot name="label">
        {{ translate(element.label) }}
      </slot>
    </label>

    <div class="col-sm-8">
      <slot></slot>

      <small
        v-if="element.props?.description"
        :id="helpId"
        class="form-text text-muted">
        {{ translate(element.props?.description) }}
      </small>

      <div
        v-if="!element.isValid"
        class="invalid-feedback">
        <ul class="list-unstyled">
          <li
            v-for="(error, index) in element.errors"
            :key="`error_${index}`">
            {{ error }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {PropType, UnwrapNestedRefs, defineComponent} from 'vue';
import {InteractiveElementInstance} from '@myparcel/vue-form-builder';
import {generateFieldId} from '@myparcel-pdk/frontend-core/src/utils/generateFieldId';
import {useTranslate} from '@myparcel-pdk/frontend-core';

/**
 * @see import('@myparcel/pdk-components').DefaultFormGroup
 */
export default defineComponent({
  name: 'Bootstrap4FormGroup',
  inheritAttrs: false,
  props: {
    element: {
      type: Object as PropType<UnwrapNestedRefs<InteractiveElementInstance>>,
      required: true,
    },
  },

  setup: (props) => {
    const id = generateFieldId(props.element);

    return {
      id,
      helpId: `fgHelp${id}`,
      translate: useTranslate(),
    };
  },
});
</script>
