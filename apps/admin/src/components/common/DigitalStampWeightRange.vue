<template>
  <span
    v-if="weightRange"
    v-test="[$.type.__name, weightRange]">

    <span
      :title="translate('digital_stamp_weight_range', {weightRange})"
      v-text="`${weightRange.min}g - ${weightRange.max}g`" />
  </span>
</template>

<script lang="ts" setup>
import {useLanguage} from '../../composables';

defineProps<{
  weightRange: {min: number; max: number; average: number};
}>();

const {translate} = useLanguage();
</script>
