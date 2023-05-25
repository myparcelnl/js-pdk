<template>
  <PdkButton
    :disabled="disabled"
    :icon="icon"
    :loading="loading"
    label="action_save"
    @click="submit" />
</template>

<script lang="ts" setup>
import {AdminIcon} from '../../types';
import {useForm} from '@myparcel/vue-form-builder';
import {useLoading} from '../../composables';

defineProps<{
  disabled?: boolean;
}>();

const form = useForm();
const {loading, setLoading} = useLoading();

async function submit() {
  setLoading(true);
  await form.submit();
  setLoading(false);
}

const icon = AdminIcon.Save;
</script>
