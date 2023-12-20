<template>
  <span v-text="label" />
</template>

<script lang="ts" setup>
import {toRefs, computed} from 'vue';
import {useDigitalStampRanges} from '../../composables';

const props = defineProps<{weight: number}>();

const propRefs = toRefs(props);

const {currentRange} = useDigitalStampRanges(propRefs.weight);
const label = computed(() => {
  return currentRange?.value?.plainLabel ? ` (${currentRange.value.plainLabel})` : '';
});
</script>
