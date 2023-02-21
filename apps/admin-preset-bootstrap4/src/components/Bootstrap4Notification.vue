<template>
  <Transition
    appear
    name="fade">
    <div
      :class="`alert alert-${notification.variant}`"
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
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import {Notification} from '@myparcel-pdk/frontend-core/src';
import {computed} from 'vue';
import {toArray} from '@myparcel/ts-utils';

const props = defineProps<{
  notification: Notification;
}>();

const contentArray = computed(() => {
  return toArray(props.notification.content);
});
</script>
