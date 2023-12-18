<template>
  <span v-text="defaultRange" />
</template>

<script lang="ts" setup>
import {toRefs} from 'vue';
import {useDigitalStampRanges} from '../../composables';

const props = defineProps<{weight: number}>();

const propRefs = toRefs(props);

const {defaultRange} = useDigitalStampRanges(propRefs.weight);
</script>
