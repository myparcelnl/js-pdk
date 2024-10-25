<template>
  <span v-text="` ${currentRange.plainLabel}`" />
</template>

<script lang="ts" setup>
import {toRefs} from 'vue';
import {useDigitalStampRanges} from '../../composables/useDigitalStampRanges';

const props = defineProps<{weight: number}>();

const propRefs = toRefs(props);

const {currentRange} = useDigitalStampRanges(propRefs.weight);
</script>
