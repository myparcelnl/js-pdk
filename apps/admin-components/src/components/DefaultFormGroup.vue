<template>
  <PdkRow>
    <PdkCol>
      <label :for="id">
        <!-- Can be used instead of the label prop. -->
        <slot name="label">
          {{ element.label }}
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

<script lang="ts" setup>
/**
 * A form group is used to render a label and a form element.
 */
import {generateFieldId, useElement, useLanguage} from '@myparcel-pdk/frontend-core/src';

const {translate} = useLanguage();

const element = useElement();
const id = generateFieldId();
</script>
