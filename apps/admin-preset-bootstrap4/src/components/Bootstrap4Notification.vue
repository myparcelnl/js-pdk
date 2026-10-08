<template>
  <Transition
    appear
    name="fade">
    <div
      v-test="AdminComponent.Notification"
      :aria-busy="notification.loading ? 'true' : undefined"
      :class="alertClasses"
      class="alert"
      role="alert">
      <div class="alert-text">
        <strong
          v-if="notification.title"
          class="mb-1"
          v-text="notification.title" />

        <p
          v-for="(item, index) in contentArray"
          :key="`alert_${index}_${item}`"
          v-text="item" />

        <span
          v-if="notification.loading"
          :title="translate('loading')"
          class="spinner-border spinner-border-sm"
          role="status">
          <span
            class="sr-only"
            v-text="translate('loading')" />
        </span>

        <button
          v-if="notification.action"
          class="btn btn-primary btn-sm"
          type="button"
          @click="notification.action.onClick()"
          v-text="notification.action.label" />
      </div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import {computed} from 'vue';
import {AdminComponent, type NotificationProps, useLanguage} from '@myparcel-dev/pdk-admin';
import {toArray} from '@myparcel-dev/ts-utils';

const props = defineProps<NotificationProps>();

const contentArray = computed(() => toArray(props.notification.content));

const {translate} = useLanguage();

const alertClasses = computed(() => {
  switch (props.notification?.variant) {
    case 'success':
      return 'alert-success';
    case 'warning':
      return 'alert-warning';
    case 'error':
      return 'alert-danger';
    default:
      return 'alert-info';
  }
});
</script>
