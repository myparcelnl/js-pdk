<template>
  <div v-test="[AdminComponent.RadioInput, element]">
    <input
      :id="id"
      v-model="model"
      :name="id"
      :class="{
        'form-required': !element.isValid,
      }"
      :disabled="element.isDisabled || element.isSuspended"
      :readonly="element.isReadOnly"
      :value="element.props?.value"
      type="radio"
      v-bind="$attrs" />

    <label :for="id">
      <PdkIcon
        v-if="element.props?.icon"
        :icon="element.props?.icon" />

      <PdkImage
        v-if="element.props?.image"
        :alt="element.label"
        :src="element.props?.image"
        width="24" />

      {{ element.label }}
    </label>
  </div>
</template>

<script lang="ts">
export default {inheritAttrs: false};
</script>

<script lang="ts" setup>
import {toRefs} from 'vue';
import {useVModel} from '@vueuse/core';
import {AdminComponent, generateFieldId, type RadioInputEmits, type RadioInputProps} from '@myparcel-pdk/admin';

// eslint-disable-next-line vue/no-unused-properties
const props = defineProps<RadioInputProps>();
const emit = defineEmits<RadioInputEmits>();

const propRefs = toRefs(props);

const model = useVModel(props, undefined, emit);

const id = generateFieldId(propRefs.element);
</script>
