<template>
  <MagicForm
    :form="form"
    @submit="$emit('submit')" />

  <NotificationContainer :category="NotificationCategory.API" />
</template>

<script lang="ts" setup>
import {MagicForm} from '@myparcel/vue-form-builder';
import {NotificationCategory} from '../../types';
import {NotificationContainer} from '../common';
import {createAccountSettingsForm} from '../../forms/createAccountSettingsForm';

defineEmits(['submit']);

const form = createAccountSettingsForm();
</script>
