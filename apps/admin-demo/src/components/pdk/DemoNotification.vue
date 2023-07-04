<template>
  <div
    :class="[
      variantClass,
      'before:bg-current',
      'before:content-[\'\']',
      'before:h-full',
      'before:inset-0',
      'before:right-auto',
      'before:absolute',
      'before:w-2',
      'mb-4',
      'overflow-hidden',
      'py-4',
      'pr-4',
      'pl-6',
      'relative',
      'rounded-lg',
    ]">
    <span
      v-if="notification.dismissible"
      class="absolute cursor-pointer right-2 top-0"
      title="Dismiss"
      @click="dismiss">
      x
    </span>

    <b
      v-if="notification.title"
      v-text="notification.title" />

    <ul v-if="contentArray.length > 1">
      <li
        v-for="item in contentArray"
        :key="item"
        v-text="item" />
    </ul>

    <p
      v-else
      v-text="contentArray[0]" />
  </div>
</template>

<script lang="ts" setup>
import {computed} from 'vue';
import {type ResolvedNotification, useNotificationStore} from '@myparcel-pdk/admin';
import {toArray} from '@myparcel/ts-utils';

const props = defineProps<{
  notification: ResolvedNotification;
}>();

const variantClass = computed(() => {
  const classes = [];

  switch (props.notification.variant) {
    case 'primary':
      classes.push('text-indigo-600', 'border-indigo-200');
      break;

    case 'secondary':
      classes.push('text-teal-600', 'border-teal-200');
      break;

    case 'success':
      classes.push('bg-emerald-100', 'text-emerald-800', 'border-emerald-200');
      break;

    case 'warning':
      classes.push('bg-amber-100', 'text-amber-800', 'border-amber-200');
      break;

    case 'error':
      classes.push('bg-rose-100', 'text-rose-800', 'border-rose-200');
      break;

    case 'info':
      classes.push('bg-blue-100', 'text-blue-800', 'border-blue-200');
      break;
  }

  return classes;
});

const notificationStore = useNotificationStore();

const dismiss = () => {
  notificationStore.remove(props.notification.id);
};

const contentArray = computed(() => toArray(props.notification.content));
</script>
