<template>
  <span :class="config.cssUtilities.whitespaceNoWrap">
    <PdkIcon
      :icon="icon"
      :class="{
        [config.cssUtilities.textColorSuccess]: props.status === PdkStatus.SUCCESS,
        [config.cssUtilities.textColorError]: props.status === PdkStatus.ERROR,
        [config.cssUtilities.animationSpin]: props.status === PdkStatus.PENDING,
      }" />
    <span v-text="text"></span>
  </span>
</template>

<script lang="ts" setup>
import {PropType, computed} from 'vue';
import {PdkIcon} from '../../types';
import {PdkStatus} from '@myparcel-pdk/common';
import {usePdkConfig} from '../../composables';

const props = defineProps({
  status: {
    type: String as PropType<PdkStatus>,
    default: PdkStatus.PENDING,
  },
  text: {
    type: String,
    default: null,
  },
});

const config = usePdkConfig();

const icon = computed(() => {
  switch (props.status) {
    case PdkStatus.SUCCESS:
      return PdkIcon.YES;
    case PdkStatus.ERROR:
      return PdkIcon.NO;
    case PdkStatus.PENDING:
    default:
      return PdkIcon.SPINNER;
  }
});
</script>
