<template>
  <span
    v-test="[$.type.__name, status]"
    :class="config?.cssUtilities?.whitespaceNoWrap">
    <PdkIcon
      :class="cssClasses"
      :icon="icon" />
    <slot />
  </span>
</template>

<script lang="ts" setup>
import {computed, type PropType} from 'vue';
import {Status} from '@myparcel-pdk/common';
import {useAdminConfig} from '../../composables';
import {AdminIcon} from "../../data";

const props = defineProps({
  status: {
    type: String as PropType<Status>,
    default: Status.Pending,
  },
});

const config = useAdminConfig();

const icon = computed(() => {
  switch (props.status) {
    case Status.Success:
      return AdminIcon.Yes;

    case Status.Error:
      return AdminIcon.No;

    default:
      return AdminIcon.Spinner;
  }
});

const cssClasses = computed(() => ({
  [config?.cssUtilities?.textColorSuccess ?? '']: props.status === Status.Success,
  [config?.cssUtilities?.textColorError ?? '']: props.status === Status.Error,
  [config?.cssUtilities?.animationSpin ?? '']: props.status === Status.Pending,
}));
</script>
