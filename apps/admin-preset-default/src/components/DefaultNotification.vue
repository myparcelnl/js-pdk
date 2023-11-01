<template>
  <div v-test="AdminComponent.Notification">
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
import {computed, type PropType} from 'vue';
import {AdminComponent, type PdkNotification} from '@myparcel-pdk/admin';
import {toArray} from '@myparcel/ts-utils';

const props = defineProps({
  /**
   * The notification to display.
   */
  notification: {
    type: Object as PropType<PdkNotification>,
    required: true,
  },
});

const contentArray = computed(() => toArray(props.notification.content));
</script>
