<template>
  <span
    v-if="dashIcon"
    v-test="AdminComponent.Icon"
    :class="`dashicons-${dashIcon}`"
    class="dashicons"
    role="none" />
</template>

<script lang="ts" setup>
import {computed, type PropType} from 'vue';
import {AdminComponent, type AdminIcon} from '@myparcel-pdk/admin';
import {convertToDashIcon} from '../convertToDashIcon';

const props = defineProps({
  icon: {
    type: String as PropType<AdminIcon>,
    required: true,
  },
});

const dashIcon = computed(() => convertToDashIcon(props.icon));
</script>
