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

      <small
        v-if="element.props?.description"
        v-html="translate(element.props.description)">
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
import {toRefs} from 'vue';
import {
  AdminComponent,
  type FormGroupProps,
  type FormGroupSlots,
  generateFieldId,
  useLanguage,
} from '@myparcel-pdk/admin';

const props = defineProps<FormGroupProps>();
defineSlots<FormGroupSlots>();

const propRefs = toRefs(props);

const id = generateFieldId(propRefs.element);

const {translate} = useLanguage();
</script>
