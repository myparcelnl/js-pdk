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
import {PdkStatus} from '@myparcel-pdk/common/src';
import {usePdkConfig} from '../../composables';

export default defineComponent({
  name: 'StatusIndicator',
  props: {
    status: {
      type: String as PropType<PdkStatus>,
      default: PdkStatus.PENDING,
    },
  },

  setup: (props) => {
    return {
      PdkStatus,
      config: usePdkConfig(),
      icon: computed(() => {
        switch (props.status) {
          case PdkStatus.SUCCESS:
            return AdminIcon.YES;

          case PdkStatus.ERROR:
            return AdminIcon.NO;

          case PdkStatus.PENDING:
          default:
            return AdminIcon.SPINNER;
        }
      }),
    };
  },
});
</script>
