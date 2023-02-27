<template>
  <div class="form-group row">
    <label
      :class="{
        required: !element.isOptional,
      }"
      :for="id"
      class="col-sm-4 form-control-label">
      <slot name="label">
        {{ element.label }}
      </slot>
    </label>

    <div class="col-sm-8">
      <slot />

      <small
        v-if="element.props?.description"
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

<script setup lang="ts">
import {ElementInstance, generateFieldId, useLanguage} from '@myparcel-pdk/frontend-core/src';
import {PropType} from 'vue';

const props = defineProps({
  element: {
    type: Object as PropType<ElementInstance>,
    required: true,
  },
});

const {translate} = useLanguage();

const id = generateFieldId(props.element);
</script>
