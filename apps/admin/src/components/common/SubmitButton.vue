<template>
  <PdkButton
    v-test="$.type.__name"
    :disabled="disabled"
    :icon="icon"
    :loading="loading"
    label="action_save"
    @click="submit" />
</template>

<script lang="ts" setup>
import {useForm} from '@myparcel/vue-form-builder';
import {AdminIcon} from '../../types';
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
