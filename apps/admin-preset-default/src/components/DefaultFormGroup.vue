<template>
  <PdkRow v-test="AdminComponent.FormGroup">
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
        {{ translate(element.props.description) }}
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
import {toRefs} from 'vue';
import {AdminComponent, generateFieldId, type PdkFormGroupProps, useLanguage} from '@myparcel-pdk/admin';

const props = defineProps<PdkFormGroupProps>();

const propRefs = toRefs(props);

const id = generateFieldId(propRefs.element);

const {translate} = useLanguage();
</script>
