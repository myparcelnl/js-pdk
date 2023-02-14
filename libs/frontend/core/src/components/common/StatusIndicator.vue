<template>
  <span :class="config.cssUtilities.whitespaceNoWrap">
    <PdkIcon
      :icon="icon"
      :class="{
        [config.cssUtilities.textColorSuccess]: status === PdkStatus.SUCCESS,
        [config.cssUtilities.textColorError]: status === PdkStatus.ERROR,
        [config.cssUtilities.animationSpin]: status === PdkStatus.PENDING,
      }" />

    <slot />
  </span>
</template>

<script lang="ts">
import {PropType, computed, defineComponent} from 'vue';
import {AdminIcon} from '../../types';
import {Status} from '@myparcel-pdk/common/src';
import {useAdminConfig} from '../../composables';

export default defineComponent({
  name: 'StatusIndicator',
  props: {
    status: {
      type: String as PropType<Status>,
      default: Status.PENDING,
    },
  },

  setup: (props) => {
    return {
      PdkStatus: Status,
      config: useAdminConfig(),
      icon: computed(() => {
        switch (props.status) {
          case Status.SUCCESS:
            return AdminIcon.YES;

          case Status.ERROR:
            return AdminIcon.NO;

          case Status.PENDING:
          default:
            return AdminIcon.SPINNER;
        }
      }),
    };
  },
});
</script>
