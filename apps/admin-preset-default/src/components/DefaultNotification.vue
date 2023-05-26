<template>
  <Transition
    appear
    name="fade">
    <div>
      <h1
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
  </Transition>
</template>

<script lang="ts" setup>
import {type PropType, computed} from 'vue';
import {type Notification} from '@myparcel-pdk/frontend-admin-core';
import {toArray} from '@myparcel/ts-utils';

const props = defineProps({
  /**
   * The notification to display.
   */
  notification: {
    type: Object as PropType<Notification>,
    required: true,
  },
});

const contentArray = computed(() => toArray(props.notification.content));
</script>
