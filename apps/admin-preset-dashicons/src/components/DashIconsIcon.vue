<template>
  <span
    v-if="dashIcon"
    v-test="'Icon'"
    :class="`dashicons-${dashIcon}`"
    class="dashicons"
    role="none" />
</template>

<script lang="ts" setup>
import {PropType, computed} from 'vue';
import {AdminIcon} from '@myparcel-pdk/frontend-core/src';
import {convertToDashIcon} from '../convertToDashIcon';

const props = defineProps({
  icon: {
    type: String as PropType<AdminIcon>,
    required: true,
  },
});

const dashIcon = computed(() => convertToDashIcon(props.icon));
</script>
