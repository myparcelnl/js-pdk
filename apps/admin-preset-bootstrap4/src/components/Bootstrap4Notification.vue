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

<script lang="ts">
import {PropType, computed, defineComponent} from 'vue';
import {Notification} from '@myparcel-pdk/frontend-core/src';
import {toArray} from '@myparcel/ts-utils';

/**
 * @see import('@myparcel-pdk/admin-components').DefaultNotification
 */
export default defineComponent({
  name: 'Bootstrap4Notification',
  props: {
    notification: {
      type: Object as PropType<Notification>,
      required: true,
    },
  },

  setup: (props) => {
    return {
      contentArray: computed(() => {
        return toArray(props.notification.content);
      }),
    };
  },
});
</script>
