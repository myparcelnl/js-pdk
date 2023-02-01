<template>
  <div>
    <MagicForm :form="form" />

    <NotificationContainer :category="NotificationCategory.API" />
  </div>
</template>

<script lang="ts" setup>
import {FormInstance, MagicForm} from '@myparcel/vue-form-builder';
import {NotificationCategory} from '../../types';
import {NotificationContainer} from '../common';
import {createAccountSettingsForm} from '../../forms/createAccountSettingsForm';

const emit = defineEmits({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  submit: (form: FormInstance) => true,
});

const form = createAccountSettingsForm(() => {
  emit('submit', form);
});
</script>
