<template>
  <PdkButton
    v-test="$.type.__name"
    :disabled="disabled"
    :icon="AdminIcon.Refresh"
    label="action_reset"
    :variant="Variant.Secondary"
    @click="reset" />
</template>

<script lang="ts" setup>
import {AdminIcon, Variant} from '@myparcel-pdk/admin-common';
import {useForm} from '@myparcel/vue-form-builder';

defineProps<{
  disabled?: boolean;
}>();

const form = useForm();

const reset = () => {
  void form.reset();
};
</script>
