<template>
  <PdkButton
    :disabled="disabled"
    :icon="AdminIcon.Refresh"
    label="action_reset"
    :variant="Variant.Secondary"
    @click="reset" />
</template>

<script lang="ts" setup>
import {Variant} from '@myparcel-pdk/common';
import {useForm} from '@myparcel/vue-form-builder';
import {AdminIcon} from '../../types';

defineProps<{
  disabled?: boolean;
}>();

const form = useForm();

const reset = () => {
  void form.reset();
};
</script>
