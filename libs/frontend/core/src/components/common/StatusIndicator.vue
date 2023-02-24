<template>
  <span :class="config?.cssUtilities?.whitespaceNoWrap">
    <PdkIcon
      :icon="icon"
      :class="cssClasses" />
    <slot />
  </span>
</template>

<script setup lang="ts">
import {PropType, computed} from 'vue';
import {AdminIcon} from '../../types';
import {Status} from '@myparcel-pdk/common/src';
import {useAdminConfig} from '../../composables';

const props = defineProps({
  status: {
    type: String as PropType<Status>,
    default: Status.PENDING,
  },
});

const config = useAdminConfig();

const icon = computed(() => {
  switch (props.status) {
    case Status.SUCCESS:
      return AdminIcon.YES;

    case Status.ERROR:
      return AdminIcon.NO;

    default:
      return AdminIcon.SPINNER;
  }
});

const cssClasses = computed(() => ({
  [config?.cssUtilities?.textColorSuccess ?? '']: props.status === Status.SUCCESS,
  [config?.cssUtilities?.textColorError ?? '']: props.status === Status.ERROR,
  [config?.cssUtilities?.animationSpin ?? '']: props.status === Status.PENDING,
}));
</script>
