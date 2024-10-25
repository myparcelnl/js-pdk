<template>
  <span
    :title="longDate"
    v-text="relativeDate" />
</template>

<script lang="ts" setup>
import {computed} from 'vue';
import {type DateTime} from '@myparcel-pdk/common';
import {Format} from '../../composables/formatter/formatter.types';
import {useLocalizedFormatter} from '../../composables/formatter/useLocalizedFormatter';

const props = defineProps<{
  date: string | DateTime;
}>();

const formatter = useLocalizedFormatter();

const longDate = computed(() => formatter.format(Format.DateLong, props.date));
const relativeDate = computed(() => formatter.format(Format.DateRelative, props.date));
</script>
